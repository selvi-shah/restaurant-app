import JWT from 'jsonwebtoken';

const authMiddleware= async (req, resp, next) => {
    try {
        //get token
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                return resp.status(401).send({
                    success: false,
                    message: "Un-Authorize User"
                })
            } else {
                req.body.id = decode.id;
                next();
            }
        })
    } catch(error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in Auth API",
            error
        })
    }
}

export default authMiddleware;

