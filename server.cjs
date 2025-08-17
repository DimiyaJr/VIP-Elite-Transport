require('dotenv').config(); // Load environment variables

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');

const app = express();

// TODO: Add your Google OAuth client ID here
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Email configuration
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify email configuration on startup
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  emailTransporter.verify((error, success) => {
    if (error) {
      console.log('Email configuration error:', error);
    } else {
      console.log('Email server is ready to send messages');
    }
  });
} else {
  console.log('Email configuration not found. Password reset functionality will not work.');
}

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth helper functions
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    full_name: user.full_name
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Send email helper function
const sendEmail = async (to, subject, html) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Email configuration not found');
  }

  const mailOptions = {
    from: {
      name: process.env.FROM_NAME || 'VIP Elite Transport',
      address: process.env.FROM_EMAIL || process.env.SMTP_USER,
    },
    to: to,
    subject: subject,
    html: html,
  };

  return await emailTransporter.sendMail(mailOptions);
};

// Generate password reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vip_transport'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Auth Routes

// Register new user
app.post('/api/auth/register', async (req, res) => {
  const { full_name, email, password, phone } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are required' });
  }

  try {
    // Check if user already exists
    const checkQuery = 'SELECT id FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const insertQuery = `
        INSERT INTO users (full_name, email, password_hash, phone, auth_provider) 
        VALUES (?, ?, ?, ?, 'local')
      `;

      db.query(insertQuery, [full_name, email, hashedPassword, phone || null], (err, results) => {
        if (err) {
          console.error('Error creating user:', err);
          return res.status(500).json({ error: 'Failed to create user' });
        }

        const user = {
          id: results.insertId,
          full_name,
          email,
          role: 'user'
        };

        const token = generateToken(user);
        res.status(201).json({
          message: 'User created successfully',
          user: { id: user.id, full_name, email, role: 'user' },
          token
        });
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND is_active = TRUE';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    try {
      const isValidPassword = await verifyPassword(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Update last login
      const updateQuery = 'UPDATE users SET last_login = NOW() WHERE id = ?';
      db.query(updateQuery, [user.id]);

      const token = generateToken(user);
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });
});

// Google OAuth login
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Google token is required' });
  }

  try {
    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: google_id, email, name: full_name, picture: profile_picture } = payload;

    // Check if user exists
    const checkQuery = 'SELECT * FROM users WHERE email = ? OR google_id = ?';
    db.query(checkQuery, [email, google_id], (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
        // User exists, update and login
        const user = results[0];
        const updateQuery = `
          UPDATE users 
          SET google_id = ?, profile_picture = ?, last_login = NOW(), email_verified = TRUE
          WHERE id = ?
        `;
        
        db.query(updateQuery, [google_id, profile_picture, user.id], (err) => {
          if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Failed to update user' });
          }

          const token = generateToken(user);
          res.json({
            message: 'Login successful',
            user: {
              id: user.id,
              full_name: user.full_name,
              email: user.email,
              role: user.role
            },
            token
          });
        });
      } else {
        // Create new user
        const insertQuery = `
          INSERT INTO users (full_name, email, google_id, profile_picture, auth_provider, email_verified) 
          VALUES (?, ?, ?, ?, 'google', TRUE)
        `;

        db.query(insertQuery, [full_name, email, google_id, profile_picture], (err, results) => {
          if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
          }

          const user = {
            id: results.insertId,
            full_name,
            email,
            role: 'user'
          };

          const token = generateToken(user);
          res.status(201).json({
            message: 'User created and logged in successfully',
            user,
            token
          });
        });
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(400).json({ error: 'Invalid Google token' });
  }
});

// Password reset request
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Check if user exists
    const checkQuery = 'SELECT id, full_name FROM users WHERE email = ? AND is_active = TRUE';
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        // Don't reveal if email exists or not for security
        return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
      }

      const user = results[0];
      const resetToken = generateResetToken();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

      // Store reset token in database
      const insertTokenQuery = `
        INSERT INTO password_reset_tokens (user_id, token, expires_at) 
        VALUES (?, ?, ?)
      `;

      db.query(insertTokenQuery, [user.id, resetToken, expiresAt], async (err, results) => {
        if (err) {
          console.error('Error storing reset token:', err);
          return res.status(500).json({ error: 'Failed to generate reset token' });
        }

        // Send password reset email
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
        
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Password Reset - VIP Elite Transport</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #ffd700 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #ffd700; color: #1a202c; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚗 VIP Elite Transport</h1>
                <h2>Password Reset Request</h2>
              </div>
              <div class="content">
                <p>Hello ${user.full_name},</p>
                <p>We received a request to reset your password for your VIP Elite Transport account.</p>
                <p>Click the button below to reset your password:</p>
                <p style="text-align: center;">
                  <a href="${resetUrl}" class="button">Reset Password</a>
                </p>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 5px;">${resetUrl}</p>
                <p><strong>This link will expire in 1 hour.</strong></p>
                <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
                <p>Best regards,<br>The VIP Elite Transport Team</p>
              </div>
              <div class="footer">
                <p>© 2024 VIP Elite Transport. All rights reserved.</p>
                <p>123 Luxury Avenue, Premium District, City 12345</p>
              </div>
            </div>
          </body>
          </html>
        `;

        try {
          await sendEmail(email, 'Password Reset - VIP Elite Transport', emailHtml);
          res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          res.status(500).json({ error: 'Failed to send password reset email' });
        }
      });
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Password reset request failed' });
  }
});

// Password reset confirmation
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    // Find valid reset token
    const tokenQuery = `
      SELECT rt.*, u.email, u.full_name 
      FROM password_reset_tokens rt 
      JOIN users u ON rt.user_id = u.id 
      WHERE rt.token = ? AND rt.expires_at > NOW() AND rt.used = FALSE AND u.is_active = TRUE
    `;

    db.query(tokenQuery, [token], async (err, results) => {
      if (err) {
        console.error('Error checking reset token:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      const resetData = results[0];
      
      try {
        // Hash new password
        const hashedPassword = await hashPassword(password);

        // Update user password
        const updatePasswordQuery = 'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?';
        
        db.query(updatePasswordQuery, [hashedPassword, resetData.user_id], (err, results) => {
          if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ error: 'Failed to update password' });
          }

          // Mark token as used
          const markTokenUsedQuery = 'UPDATE password_reset_tokens SET used = TRUE WHERE id = ?';
          db.query(markTokenUsedQuery, [resetData.id], (err) => {
            if (err) {
              console.error('Error marking token as used:', err);
            }
          });

          res.json({ message: 'Password reset successfully' });
        });
      } catch (hashError) {
        console.error('Error hashing password:', hashError);
        res.status(500).json({ error: 'Failed to process password' });
      }
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Password reset failed' });
  }
});

// Get current user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const query = 'SELECT id, full_name, email, phone, role, profile_picture, created_at FROM users WHERE id = ?';
  db.query(query, [req.user.id], (err, results) => {
    if (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: results[0] });
  });
});

// Get all bookings
app.get('/api/bookings', authenticateToken, (req, res) => {
  let query = 'SELECT * FROM bookings';
  let params = [];

  // If user is not admin, only show their bookings
  if (req.user.role !== 'admin') {
    query += ' WHERE user_id = ?';
    params.push(req.user.id);
  }

  query += ' ORDER BY created_at DESC';
  
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
      return;
    }
    res.json(results);
  });
});

// Create new booking
app.post('/api/bookings', authenticateToken, (req, res) => {
  const {
    full_name,
    contact_number,
    email,
    pickup_address,
    drop_address,
    pickup_date,
    pickup_time,
    vehicle_type,
    special_requests
  } = req.body;

  if (!full_name || !contact_number || !email || !pickup_address || !drop_address || 
      !pickup_date || !pickup_time || !vehicle_type) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  const query = `
    INSERT INTO bookings 
    (full_name, contact_number, email, pickup_address, drop_address, pickup_date, pickup_time, vehicle_type, special_requests, user_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name,
    contact_number,
    email,
    pickup_address,
    drop_address,
    pickup_date,
    pickup_time,
    vehicle_type,
    special_requests || null,
    req.user.id
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating booking:', err);
      res.status(500).json({ error: 'Failed to create booking' });
      return;
    }
    
    res.status(201).json({ 
      message: 'Booking created successfully',
      bookingId: results.insertId 
    });
  });
});

// Get all contact submissions
app.get('/api/contact-submissions', authenticateToken, requireAdmin, (req, res) => {
  const query = 'SELECT cs.*, u.full_name as user_name, u.email as user_email FROM contact_submissions cs LEFT JOIN users u ON cs.user_id = u.id ORDER BY cs.created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contact submissions:', err);
      res.status(500).json({ error: 'Failed to fetch contact submissions' });
      return;
    }
    res.json(results);
  });
});

// Create new contact submission
app.post('/api/contact-submissions', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if user is authenticated
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let userId = null;

  if (token) {
    try {
      const user = verifyToken(token);
      userId = user.id;
    } catch (error) {
      // Token invalid, but we still allow anonymous contact submissions
    }
  }

  const query = 'INSERT INTO contact_submissions (name, email, message, user_id) VALUES (?, ?, ?, ?)';
  const values = [name, email, message, userId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating contact submission:', err);
      res.status(500).json({ error: 'Failed to create contact submission' });
      return;
    }
    
    res.status(201).json({ 
      message: 'Contact submission created successfully',
      submissionId: results.insertId 
    });
  });
});

// Admin routes

// Get all users (admin only)
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  const query = `
    SELECT id, full_name, email, phone, role, auth_provider, email_verified, 
           created_at, last_login, is_active 
    FROM users 
    ORDER BY created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
      return;
    }
    res.json(results);
  });
});

// Update user role (admin only)
app.put('/api/admin/users/:id/role', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  const query = 'UPDATE users SET role = ? WHERE id = ?';
  db.query(query, [role, id], (err, results) => {
    if (err) {
      console.error('Error updating user role:', err);
      res.status(500).json({ error: 'Failed to update user role' });
      return;
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User role updated successfully' });
  });
});

// Start server
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});