import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const registerController = async (req, resp) => {
    try {
        console.log(req.body)
        const {userName, email, password, phone, address}= req.body
        if(!userName || !email || !password || !address || !phone) {
            return resp.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        //check user
        const exisiting = await userModel.findOne({email});
        if(exisiting){
            return resp.status(500).send({
                success: false,
                message: "Email already registerd please login"
            })
        } 
        //hashing password
            var salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(password, salt)
        //create new user
        const user = await userModel.create({userName, email, password:hashedPassword, address, phone})
        resp.status(201).send({
            user,
            success: true,
            message: "Successfully Registered"
        });
    } catch(error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in register API",
            error
        })
    }
}

//login
const loginController = async (req, resp) => {
    try {
        const {email, password}= req.body
        //for validation
        if(!email || !password) {
            return resp.status(500).send({
                success:false,
                message: "Please provide email or password"
            })
        }
        //check user
        const user = await userModel.findOne({email: email})
        if(!user){
            return resp.status(404).send({
                message: "User not found",
                success: false
            })
        }
        //compare user password 
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return resp.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        //token 
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        user.password = undefined;
        resp.status(200).send({
            user,
            token, 
            success: true,
            message: "Login successfully"
        })
    } catch(error){
        console.log(error),
        resp.status(500).send({
            message: "Error in login API",
            success: false,
            error
        })
    }

};

export { registerController, loginController };