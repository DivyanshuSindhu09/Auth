import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/database.js"

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials : true
}))

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${PORT} `)
})

connectDB()

app.get('/', (req, res) => {
    res.json({
        Message : "TMKY"
    })
})