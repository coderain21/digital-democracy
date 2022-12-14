const User = require('../models/User');
const bcrypt = require('bcrypt');

const login = async (req,res)=>{
    const {email,password} =req.body;
    if (!email || !password){
        res.status(400).json({message: "Username and password are required"})
    }
    try {
        const user = await User.findOne({email:email}).exec();
        if (!user){
            return res.status(401).json({message:"Wrong credentials"});
        }

        const pwdMatch = await bcrypt.compare(password, user.password);
        if (pwdMatch) {
            res.status(200).json({message:"Login success", user:user});
        }
        else {
            res.status(401).json({message:"Wrong credentials"});
        }
    } catch(err) {
        console.error(err);
    }
}

module.exports = {login}