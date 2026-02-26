import categoryModel from "../models/categoryModel.js"

//Create category 
const createCategoryController = async(req, resp) => {
    try{
        const {title, imageUrl} = req.body;
        if(!title) {
            return resp.status(400).send({
                success: false,
                message: "Please provide category title or image"
            })
        } 
        const newCategory = new categoryModel({title,imageUrl})
        await newCategory.save()
        resp.status(201).send({
            success: true,
            message: "category created successfully",
            newCategory
        })
    }catch (error){
        resp.status(500).send({
            success: false,
            message: "Error in create category API",
            error
        })
    }
}

//get all category data
const getAllCategoryController = async (req, resp) => {
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            return resp.status(404).send({
                success: false,
                message: "Not found",
                error
            })
        } resp.status(200).send({
            success: true,
            message: "Successfully found categories",
            data: categories
        })
    } catch (error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in get all category API",
            error
        })
    }
}

//get single category data
const getCategoryByIdController = async (req, resp) => {
    try {
        const category = await categoryModel.findById({_id:req.params.id})
        if(!category){
            return resp.status(404).send({
                success: false,
                message: "Not found",
                error
            })
        } resp.status(200).send({
            success: true,
            message: "Successfully found category",
            data: category
        })
    } catch (error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in get single category API",
            error
        })
    }
}

//delete category
const deleteCategoryController = async (req,resp) => {
    try{
        const categoryId = req.params.id 
        if(!categoryId){
            return resp.status(404).send({
                success: false,
                message: "Not found",
                error
            })
        } await categoryModel.findByIdAndDelete(categoryId)
         resp.status(200).send({
            success: true,
            message: "Succesfully deleted category"
        })

    }catch(error){
        resp.status(500).send({
            success: false,
            message: "Error in delete category API",
            error
        })
    }
}

export {createCategoryController, getAllCategoryController, getCategoryByIdController, deleteCategoryController}