require('dotenv').config(); // Load environment variables

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();

// TODO: Add your Google OAuth client ID here
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

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
  console.log('✅ Test endpoint hit');
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// AUTHENTICATION ROUTES

// Register new user
app.post('/api/auth/register', async (req, res) => {
  console.log('🔐 Register endpoint hit with data:', req.body);
  
  const { full_name, email, password, phone } = req.body;

  if (!full_name || !email || !password) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ error: 'Full name, email, and password are required' });
  }

  try {
    // Check if user already exists
    console.log('🔍 Checking if user exists with email:', email);
    const checkQuery = 'SELECT id FROM users WHERE email = ?';
    
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error('❌ Database error checking user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
        console.log('❌ User already exists');
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      try {
        // Hash password and create user
        console.log('🔐 Creating new user');
        const hashedPassword = await hashPassword(password);
        const insertQuery = `
          INSERT INTO users (full_name, email, password_hash, phone, auth_provider, email_verified, is_active) 
          VALUES (?, ?, ?, ?, 'local', 1, 1)
        `;

        db.query(insertQuery, [full_name, email, hashedPassword, phone || null], (err, results) => {
          if (err) {
            console.error('❌ Error creating user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
          }

          const user = {
            id: results.insertId,
            full_name,
            email,
            role: 'user'
          };

          const token = generateToken(user);
          
          console.log('✅ User created successfully:', { id: user.id, email: user.email });
          res.status(201).json({
            message: 'User created successfully',
            user: { id: user.id, full_name, email, role: 'user' },
            token
          });
        });
      } catch (hashError) {
        console.error('❌ Password hashing error:', hashError);
        return res.status(500).json({ error: 'Failed to process password' });
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  console.log('🔐 Login endpoint hit with email:', req.body.email);
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('❌ Missing email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND is_active = TRUE';
  
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('❌ Database error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      console.log('❌ User not found or inactive:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    console.log('👤 User found:', { id: user.id, email: user.email, role: user.role });

    try {
      const isValidPassword = await verifyPassword(password, user.password_hash);
      if (!isValidPassword) {
        console.log('❌ Invalid password for user:', user.email);
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Update last login
      const updateQuery = 'UPDATE users SET last_login = NOW() WHERE id = ?';
      db.query(updateQuery, [user.id]);

      const token = generateToken(user);
      
      console.log('✅ Login successful for user:', { id: user.id, email: user.email });
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
      console.error('❌ Password verification error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  });
});

// Google OAuth login (placeholder for now)
app.post('/api/auth/google', async (req, res) => {
  console.log('🔐 Google OAuth endpoint hit');
  res.status(501).json({ error: 'Google OAuth not configured yet' });
});

// Get current user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  console.log('👤 Profile endpoint hit for user:', req.user.id);
  
  const query = 'SELECT id, full_name, email, phone, role, profile_picture, created_at FROM users WHERE id = ?';
  db.query(query, [req.user.id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching profile:', err);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('✅ Profile fetched for user:', req.user.id);
    res.json({ user: results[0] });
  });
});

// EXISTING ROUTES

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
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🔗 Test your API at: http://localhost:${PORT}/api/test`);
});