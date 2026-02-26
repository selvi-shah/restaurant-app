import userModel from '../models/userModel.js'

const adminMiddleware= async (req, resp, next) => {
    try {
       const user = await userModel.findById(req.body.id)

        if (!user) {
            return resp.status(404).send({
                success: false,
                message: "User not found"
            });
        }

       if(user.usertype !== "admin") {
        return resp.status(401).send({
            success: false,
            message: "Only admin access"
        })
       } else{
        next();
       }
    } catch(error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Un-Authorized Access",
            error
        })
    }
}

export default adminMiddleware;

