
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

const getUserController = async (req, resp) => {
    try {
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user) {
            return resp.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //hide password
        user.password = undefined
        //resp
        resp.status(200).send({
            success: true,
            message: "User get successfully",
            user,
        });
    } catch(error) {
        resp.status(500).send({
            message:"Error in get user API",
            success: false,
            error
        });
    }

}

//update user
const updateUserController = async (req, resp) => {
    try {
        //find user
        const user = await userModel.findById({_id: req.body.id})
        //validation
        if(!user){
            resp.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //update
        const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        //sava user
        await user.save()
        resp.status(200).send({
            success: true,
            message: "User updated succefully"
        })
    } catch(error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in update user controller",
        error
        })
    }
}

//Reset password controller
const resetPasswordController = async (req, resp) => {
    try {
        const {email, newPassword, answer} = req.body
        if(!email || !newPassword || !answer ){
            return resp.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            return resp.status(500).send({
                success: false,
                message: "User not found or invalid ans"
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        resp.status(200).send({
            success: true,
            message: "Password reset succesfully"
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in reset password API",
            error
        })
    }
}

//update user password controller
const updatePasswordController = async (req, resp) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user) {
            return resp.status(404).send({
                success: false,
                message: "User not found",
            })
        }
        //get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword) {
            return resp.status(500).send({
                success: false,
                message: "Please provide old or new password",
            })
        }
        //compare user password 
        console.log(oldPassword);
        console.log(user.password);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        console.log(isMatch);
        if(!isMatch){
        return resp.status(500).send({
            success: false,
            message: "Invalid old password",
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;
        await user.save()
        resp.status(200).send({
            success: true,
            message: "Password updated",
        })
    } catch(error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in password update API",
            error
        })
    }
} 

//Delete User Controller
const deleteUserController = async (req, resp) => {
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return resp.status(200).send({
            success: true,
            message: "User deleted succesfully"
        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error in delete profile API"
        })
    }
}

export {getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController}