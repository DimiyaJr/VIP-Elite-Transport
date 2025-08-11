require('dotenv').config(); // Load environment variables

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Get all bookings
app.get('/api/bookings', (req, res) => {
  const query = 'SELECT * FROM bookings ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
      return;
    }
    res.json(results);
  });
});

// Create new booking
app.post('/api/bookings', (req, res) => {
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
    (full_name, contact_number, email, pickup_address, drop_address, pickup_date, pickup_time, vehicle_type, special_requests) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    special_requests || null
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
app.get('/api/contact-submissions', (req, res) => {
  const query = 'SELECT * FROM contact_submissions ORDER BY created_at DESC';
  
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

  const query = 'INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)';
  const values = [name, email, message];

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

// Start server
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
