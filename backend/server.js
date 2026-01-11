import "dotenv/config"

import adminRoutes from "./routes/admin.js"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./routes/auth.js"
import connectDB from "./config/db.js"
import publicRoutes from "./routes/public.js"

connectDB()

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes);
app.use("/api",publicRoutes)

const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Backend running on http://localhost:${PORT}`)
})

