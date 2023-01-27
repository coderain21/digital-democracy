const User = require('../models/User');
const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    const {name,email,password, address, zipcode, interests} =req.body;
    const user = await User.findOne({email:email}).exec();
    if (user) {
        return res.status(409).json({message:"A user already exists with this email address"});
    }
    try {
        const encryptedPass = await bcrypt.hash(password, 10);
        await User.create({name,email,password: encryptedPass, address, zipcode, interests});
        res.status(201).json({message:"Sign up sucessfull"});
    } catch(err) {
        console.error(err);
    }
}

module.exports = {signup}