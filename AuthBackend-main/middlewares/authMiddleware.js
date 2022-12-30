const jwt = require('jsonwebtoken');

//app.config
const secureKey = "secure";

module.exports=(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,secureKey);
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).send({message:"Auth Failed"})
    }
}