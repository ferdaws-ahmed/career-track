const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { getDB } = require('../../config/db');

// Register User
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      return next(new Error('Name, email, and password are required!'));
    }

    const db = getDB();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      res.status(400);
      return next(new Error('This email is already registered!'));
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      passwordHash,
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);
    const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      success: true,
      token,
      user: { id: result.insertedId, name, email, profilePicture: '' }
    });
  } catch (err) {
    next(err);
  }
};

// Login User
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      return next(new Error('Email and password are required!'));
    }

    const db = getDB();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      res.status(400);
      return next(new Error('Invalid email or password!'));
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(400);
      return next(new Error('Invalid email or password!'));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, profilePicture: user.profilePicture || '' }
    });
  } catch (err) {
    next(err);
  }
};

// Get Current User (/api/auth/me)
const getMe = async (req, res, next) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(req.user.id) },
      { projection: { passwordHash: 0 } }
    );

    if (!user) {
      res.status(404);
      return next(new Error('User not found!'));
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// Update User Profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, profilePicture, currentPassword, newPassword } = req.body;
    const db = getDB();
    const usersCollection = db.collection('users');

    // Get current user
    const user = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });
    if (!user) {
      res.status(404);
      return next(new Error('User not found!'));
    }

    const updateData = {
      updatedAt: new Date()
    };

    if (name) updateData.name = name;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    // If updating password
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        res.status(400);
        return next(new Error('Current password is incorrect!'));
      }
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(newPassword, salt);
    } else if (currentPassword || newPassword) {
      // If only one is provided
      res.status(400);
      return next(new Error('Please provide both current and new password to change password!'));
    }

    // Update user
    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(req.user.id) },
      { $set: updateData },
      { returnDocument: 'after', projection: { passwordHash: 0 } }
    );

    res.status(200).json({
      success: true,
      user: result.value
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile
};