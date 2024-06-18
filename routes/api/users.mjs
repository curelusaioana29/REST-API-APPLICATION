import express from 'express';
import User from '../../models/user.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import auth from '../../middleware/auth.mjs';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password)
    return res.status(400).json({message: 'Email and password are required'});

  try {
    const existingUser = await User.findOne({email});

    if (existingUser) return res.status(409).json({message: 'Email in use'});

    const newUser = new User({email, password});

    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password)
    return res.status(400).json({message: 'Email and password are required'});

  try {
    const user = await User.findOne({email});

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({message: 'Email or password is wrong'});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    user.token = token;

    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    const user = req.user;

    user.token = null;

    await user.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get('/current', auth, async (req, res) => {
  const user = req.user;

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
});

export default router;