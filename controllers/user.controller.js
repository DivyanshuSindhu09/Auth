import { User } from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            message : "All fields are required!",
            success : false
        })
    }
    try {
        const existingUser = await User.findOne({email})


        if(existingUser){
            return res.status(400).json({
            message : "User Already Exists!",
            success : false
        })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
        })

        const token = jwt.sign({
            id : user._id,
        }, process.env.JWT_SECRET, {expiresIn : '7d'})

        res.cookie('token', token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'development' ? "strict" : "none",
            maxAge : 7*24*60*60*1000
        })

        return res.status(200).json({
            success : true,
            message : "User signedup successfully"
        })
        /*
            httpOnly: Cookie ko client-side JavaScript se access hone se rokta hai (XSS se security).

            secure: Cookie sirf HTTPS par send hogi jab app production mode mein hoga.

            sameSite: Development me "strict" (cross-site blocked), Production me "none" (cross-site allowed for frontend–backend).

            maxAge: Cookie kitne time (ms) tak valid rahegi — yahan 7 din tak.
        */
    } catch (error) {
        return res.json({success : false,
            message : error.message
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(401).json({
            success : false,
            message : "Email and Password are required!"
        })
    }

    try {
        const user = await User.findOne({email})

        if (!user) {
            res.status(401).json({success : false,
                message : "User not found!"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.json({
                message : "Invalid password",
                success : false
            })
        }

        const token = jwt.sign({
            id : user._id,
        }, process.env.JWT_SECRET, {expiresIn : '7d'})

        res.cookie('token', token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'development' ? "strict" : "none",
            maxAge : 7*24*60*60*1000
        })

        return res.status(200).json({
            success : true,
            message : "User login successfull"
        })
        
    } catch (error) {
        return res.json({
            success : false,
            message : error.message
        })
    }
}