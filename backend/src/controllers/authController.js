import bcrypt from "bcryptjs";
import Joi from "joi";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


// validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


// REGISTER
export const registerUser = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw { status: 400, message: error.details[0].message };

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      throw { status: 400, message: "User already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};


// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw { status: 400, message: error.details[0].message };

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      throw { status: 401, message: "Invalid credentials" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw { status: 401, message: "Invalid credentials" };

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
