const jwt = require("jsonwebtoken")
require("dotenv/config")

const auth = (req, res, next)=>{
    let token = req.header("authentication")
    if(!token){
        return res
            .status(401)
            .json({ variant: "error", msg: "Ro'yhatdan o'tmagansiz", innerData: null });
    }
    jwt.verify(token, process.env.privateKey, (err, decoded) => {
        if (err) {
          res.status(403).json({
            state: false,
            msg: "Token xato",
          });
        } else {
          req.user = decoded;
          next();
        }
    });
}

module.exports = {auth}