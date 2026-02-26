import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, "Please provide title"]
        },
        description:{
            type:String,
            required:[true, "Please provide description"]
        },
        price:{
            type:Number,
            required:[true, "Please provide price"]
        },
        foodTags:{
            type:String,
        },
        category: {
            type:String,
        },
        code:{
            type:String,
        },
        isAvailable:{
            type:Boolean,
            default:true
        },
        resturant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Resturant' 
        }
    },{timestamps:true})

const foodModel= mongoose.model("foods", foodSchema)

export default foodModel;