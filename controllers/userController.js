const getUserController = async (req, resp) => {
    try {
        resp.send("Hello Baby")
    } catch(error) {
        resp.status(500).send({
            message:"",
            success: false,
        });
    }

}

export default getUserController;