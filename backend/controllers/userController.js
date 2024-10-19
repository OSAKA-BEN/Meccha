import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

// creating token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})
}

// Route 1: Login User
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await userModel.findOne({email})
    if(!user) {
      return res.status(400).json({success: false, message: "User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
      const token = jwt.sign(
        {id: user._id, name: user.name, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: "30d"}
      )
      res.status(200).json({success: true, message: "Login successful", token})
    }
    else {
      res.status(400).json({success: false, message: "Invalid password"})
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: error.message})
  }
}

// Route 2: Register User
const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try {

        // check if user already exists
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.status(400).json({success: false, message: "User already exists"})
        }

        // validating email & strong password
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Please enter a valid email"})
        }
        if(password.length < 8) {
            return res.status(400).json({success: false, message: "Password must be at least 8 characters long"})
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating user
        const newUser = new userModel({name, email, password: hashedPassword})

        const user = await newUser.save()

        const token = createToken(user._id)
        res.status(201).json({success: true, message: "User created successfully", token})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}

// Route 3: Admin login
const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.status(200).json({success: true, message: "Admin Login successful", token})
    }
    else {
      res.status(400).json({success: false, message: "Invalid credentials"})
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: error.message})
  }
}

export {loginUser, registerUser, adminLogin}
