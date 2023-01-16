const User = require('../models/User');

const login = async (req,res)=>{
    const {email,password} =req.body;
    if (!email || !password){
        res.status(400).json({message: "Username and password are required"})
    }
    try {
        const user = await User.findOne({email:email}).exec();
        if(user){
            if(password === user.password){
                res.status(200).json({message:"Login success", user:user});
            } else {
                res.status(401).json({message: "Wrong credentials"});
            }
         } else {
             res.status(401).json({message:"Wrong credentials"});
         }
    } catch(err) {
        console.error(err);
    }
}

module.exports = {login}