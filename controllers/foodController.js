import foodModel from "../models/foodModel.js"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

const createFoodController = async (req, resp) => {
    try{
        const {title, description, price, foodTags, isAvailable, resturant} = req.body
        if(!title || !description || !price ) {
            return resp.status(404).send({
                success: false,
                message: "Please provide all fields"
            })
        } const newFood = new foodModel({title, description, price, foodTags, isAvailable, resturant})
         await newFood.save()
         resp.status(201).send({
            success: true,
            message: "New food items created",
            newFood
         })

    }catch(error){
        resp.status(500).send({
        success: false,
        message: "Error in create food API",
        error
     })
    }
}

//get all foods
const getAllFoodController = async (req, resp) => {
    try{
        const getFoods = await foodModel.find({})
        if(!getFoods ) {
            return resp.status(404).send({
                success: false,
                message: "Not Found"
            })
        } 
         resp.status(201).send({
            success: true,
            message: "Successfully get all food data",
            getFoods
         })

    }catch(error){
        resp.status(500).send({
        success: false,
        message: "Error in get all foods API",
        error
     })
    }
}

//get single food data
const getFoodByIdController = async (req, resp) => {
    try{
        const getFood = await foodModel.find({_id:req.params.id})
        if(!getFood ) {
            return resp.status(404).send({
                success: false,
                message: "Not Found"
            })
        } 
         resp.status(201).send({
            success: true,
            message: "Successfully get single food data",
            getFood
         })

    }catch(error){
        resp.status(500).send({
        success: false,
        message: "Error in get single foods API",
        error
     })
    }
}

//delete
const deleteFoodController = async (req, resp) => {
    try{
        const Food = await foodModel.findByIdAndDelete({_id:req.params.id})
        if(!Food ) {
            return resp.status(404).send({
                success: false,
                message: "Not Found"
            })
        } 
         resp.status(201).send({
            success: true,
            message: "Successfully deleted food data",
         })

    }catch(error){
        resp.status(500).send({
        success: false,
        message: "Error in delete foods API",
        error
     })
    }
}

//update food
const updateFoodController = async (req, resp) => {
    try{
        const foodID = req.params.id
        if(!foodID ) {
            return resp.status(404).send({
                success: false,
                message: "Not Found"
            })
        } 
        const newFood = foodModel.findById(foodID)
         if(!newFood){
            resp.status(404).send({
            success: false,
            message: "No food found",
         })
        }
        const {title, description, price, foodTags, isAvailable} = req.body
        const updatedFood = await foodModel.findByIdAndUpdate(foodID, {title, description, price, foodTags, isAvailable}, {new:true})
        resp.status(200).send({
            success:true,
            message: "Successfully updated",
        })
    }catch(error){
        resp.status(500).send({
        success: false,
        message: "Error in update foods API",
        error
     })
    }
}

//place order
const placeOrderController = async (req, resp) => {
    try{
        const {cart, payment} = req.body
        if(!cart){
            return resp.status(500).send({
                success: false,
                message: "please add food cart or payment method"
            })
        }
        let total =0
        //calculate
        cart.map((i) => {
           total += i.price})
        const newOrder = new orderModel({foods:cart, payment:total, buyer:req.body.id})
        await newOrder.save()
        resp.status(201).send({
            success:true,
            message:"Order placed successfully",
            newOrder
        })
    }catch(error){
        resp.status(500).send({
        success: false,
        message: "Error in order place API",
        error
     })
    }

}

//Change order status
const orderStatusController = async(req, resp) => {
try{
        const orderID = req.params.id
        if(!orderID){
            return resp.status(404).send({
                success: false,
                message: "please provide valid id"
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderID,{status},{new:true})
            return resp.status(200).send({
                success: true,
                message: "Order status updated"
            })
    }catch(error){
        resp.status(500).send({
        success: false,
        message: "Error in change order API",
        error
     })
    }

}

export {orderStatusController, createFoodController, getAllFoodController, getFoodByIdController, deleteFoodController, updateFoodController, placeOrderController}