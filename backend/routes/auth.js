import express from "express"
import User from "../models/User.js"
import bcrypt, { hash } from "bcrypt"
import upload from "../config/multer.js"
import { getToken } from "next-auth/jwt"
const router = express.Router()


router.get("/debug", async (req, res) => {
    const users = await User.find()
    res.json({
        count: users.length,
        users,
    })
})


router.post("/register", async(req, res)=>{
    try{
        const {name, email, password} = req.body

        if (!name || !email || !password){
            return res.status(400).json({error: "All fields are required"})
        }

        const existingUser = await User.findOne({email})

        if (existingUser){
            return res.status(409).json({error: "User already exists"})
        }


        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            id: user._id,
            name: user.name,
            email:user.email
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({error:"Internal server error"})
    }
})

router.post("/login", async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                error: "Email and Passwords are required"
            })
        }
        const user = await User.findOne({email})

        const isMatch  = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({
                error: "Invalid credentials"
            })
        }

        return res.status(200).json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

router.post("/upload-avatar",upload.single("avatar"), async (req, res)=>{
    try{
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        })

        if (!token || !token.email){
            return res.status(401).json({error: "Unauthorized"})
        }

        const user = await User.findOne({email: token.email})

        if (!user){
            return res.status(404).json({error: "User not found"})
        }

        if(!req.file){
            return res.status(400).json({error: "No file uploaded"})
        }
        user.avatar = req.file.path
        await user.save()

        return res.status(200).json({
            avatarUrl: req.file.path
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({error: "Upload failed"})
    }
})

export default router