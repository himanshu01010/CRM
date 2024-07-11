const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const register = async (req, res, { userModel }) => {
  try {
    const User = mongoose.model(userModel);
    const UserPassword = mongoose.model(userModel + 'Password');

    const { name, email, password, country } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'User with this email already exists.',
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      country,
      enabled:true
    });

    const savedUser = await newUser.save();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(salt + password, 12);

    // Save password
    const newUserPassword = new UserPassword({
      user: savedUser._id,
      password: hashedPassword,
      salt,
    });

    await newUserPassword.save();

    res.status(200).json({
      success: true,
      result: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        country: savedUser.country,
      },
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
    });
  }
};

module.exports = register;