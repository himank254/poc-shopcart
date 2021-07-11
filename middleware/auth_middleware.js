const jwt = require('jsonwebtoken')
const userList = require('../models/users')

const auth = async (req,res,next) => {
    try{
        if(!req.header("Authorization")){
            res.send("Token is required")
        }
        else{
            const token = req.header("Authorization").split(" ")[1]
            const decoded = jwt.verify(token, 'himankkasecrethaiyeh')  
            const fetched_user = await userList.find({"_id": decoded.id})
            if (fetched_user[0].isAdmin == true){
            next()
            }
            else{
            res.send("You are not authorised to perform this function")
            }

            }
    }catch(e){
        res.status(400).send(e.message)
    }

}

module.exports = auth