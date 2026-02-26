import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, "Please provide title"]
        },
        imageUrl:{
            type:String,
            default: ""
        },
    },{timestamps:true})

const categoryModel= mongoose.model("Category", categorySchema)

export default categoryModel;