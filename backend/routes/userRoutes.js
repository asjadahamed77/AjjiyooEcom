import express from "express";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// REGISTER USER
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }
    user = new userModel({ name, email, password });
    await user.save();

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// LOGIN
userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body
  try {
  let user = await userModel.findOne({email})
  if(!user){
    return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials." });
  }
  const isMatch = await user.matchPassword(password)
  if(!isMatch){
    return res
        .status(400)
        .json({ success: false, message: "Invalid Password." });
  }
   // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

export default userRouter;
