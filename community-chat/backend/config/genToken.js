const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken=(user)=>{
    return jwt.sign({
          payload:{
            id:user._id
        }
    },
    process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
} 
module.exports=generateToken;