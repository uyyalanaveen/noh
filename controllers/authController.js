import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// Register new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });

    await user.save();

    // Generate token and set cookie after saving the user
    generateTokenAndSetCookie(user.id, res);

    // Send success response
    return res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error("Register error:", err); // Log the error for debugging
    return res.status(500).send("idk");
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'user not found' });
    }

    console.log('User object:', user);

    // Ensure password is defined
    if (!user.password) {
      return res.status(400).json({ msg: 'password not found' });
    }

    // Compare passwords
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: ' does not match' });
      }
    } catch (err) {
      console.error('Error comparing passwords:', err);
      return res.status(500).send('Server error');
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(user.id, res);

    // Send success response
    return res.json({ msg: 'Login successful' });

  } catch (err) {
    console.error('Login error:', err); // Log error details
    return res.status(500).send('Server error');
  }
};


export const getusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.error('getusers error:', err); // Log error details
    return res.status(500).send('Server error');
  }
};


