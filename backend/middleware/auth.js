import jwt from "jsonwebtoken"
import User from "../models/User.js"

const authMiddleware = async (req, res, next) =>{
    try{
        const token = req.cookies?.token

        if (!token){
            return res.status(401).json({error: "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (!user){
            return res.status(401).json({error: "User not found"})
        }
        req.user = user
        next()
    }catch(err){
        return res.status(401).json({error: "Invalid token"})
    }
}

export default authMiddleware