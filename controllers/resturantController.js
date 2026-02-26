import resturantModel from "../models/resturantModel.js";

//create restuarant
const createResturantController = async (req, resp) => {
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body
        //validation
        if(!title || !coords){
            return resp.status(500).send({
                success: false,
                message: "please provide title and address"
            });
        }
        const newResturant = new resturantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords})
        await newResturant.save();

        resp.status(201).send({
            success:true,
            message: "New restuarant successfully created"
        })
    } catch(error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in create resturant API",
            error
        })
    }
}
//Get All Restuarant data
const getAllRestuarantController = async (req, resp) => {
    try {
        const restuarants = await resturantModel.find({})
        if(!restuarants){
            return resp.status(404).send({
                success: false,
                message: "No restuarant available"
            })
        }
        resp.status(200).send({
            success: true,
            message: "All data found",
            totalCount:restuarants.length,
            restuarants
        })
    } catch(error){
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in get all restuartant API"
        })
    }
}
//Get single restuarant data
const getRestuarantByIdController = async (req, resp) => {
    try{
        const restuarantById = await resturantModel.findById({_id:req.params.id})
        if(!restuarantById){
            return resp.status(404).send({
                success:false,
                message:"Not Found by ID"
            })
        }
        resp.status(200).send({
            success: true,
            message: "Found",
            data: restuarantById
        })

    } catch(error){
        resp.status(500).send({
            success: false,
            message: "Error in single restuarant data API",
            error
        })
    }
}

//Delete restuarant
const deleteRestuarantController = async (req,resp) => {
    try{
        const resturantId = req.params.id 
        if(!resturantId){
            return resp.status(404).send({
                success: false,
                message: "Not found",
                error
            })
        } await resturantModel.findByIdAndDelete(resturantId)
         resp.status(200).send({
            success: true,
            message: "Succesfully deleted restuarant"
        })

    }catch(error){
        resp.status(500).send({
            success: false,
            message: "Error in delete restuarant API",
            error
        })
    }
}

export {createResturantController, getAllRestuarantController, getRestuarantByIdController, deleteRestuarantController}