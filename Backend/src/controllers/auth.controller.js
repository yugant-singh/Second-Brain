import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export async function registerController(req, res) {
    try { 
        const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });



    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user
    })
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }


}

export  async function  loginController(req, res){
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

      res.cookie("token",token)
    res.status(200).json({ 
        token, 
        user: { id: user._id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export async function getMeController(req, res) {
  try {
    const userId = req.user.id

    const user = await userModel.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    res.status(200).json({
      message: "user detail fetched successfully",
      user
    })
  }
  catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}