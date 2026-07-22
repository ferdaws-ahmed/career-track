const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

const errorHandler = require('./middleware/errorHandler');

// Module Routes Import

const authRoutes = require('./modules/auth/auth.routes');
const applicationRoutes = require('./modules/application/application.routes');

dotenv.config();
const app = express();

// Global Middlewares
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://career-track-omega.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Database Connect
connectDB();

// Module Route Registration
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'CareerTrack Lite API is running!' });
});

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Route not found - ${req.originalUrl}`));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));