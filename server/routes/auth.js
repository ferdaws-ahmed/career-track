const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');

// Register API
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'সবগুলো ঘর পূরণ করো!' });
    }

    const db = getDB();
    const usersCollection = db.collection('users');

    // ইউজার অলরেডি আছে কিনা চেক
    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'এই ইমেইল দিয়ে অ্যাকাউন্ট অলরেডি আছে!' });
    }

    // পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // নতুন ইউজার ডাটা তৈরি
    const newUser = {
      name,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // ডাটাবেজে ইনসার্ট করা
    const result = await usersCollection.insertOne(newUser);
    
    const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(201).json({ 
      token, 
      user: { id: result.insertedId, name, email } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'ইমেইল এবং পাসওয়ার্ড দুটিই লাগবে!' });
    }

    const db = getDB();
    const usersCollection = db.collection('users');

    // ইউজার খোঁজা
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'ভুল ইমেইল বা পাসওয়ার্ড!' });
    }

    // পাসওয়ার্ড ম্যাচ করা
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'ভুল ইমেইল বা পাসওয়ার্ড!' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;