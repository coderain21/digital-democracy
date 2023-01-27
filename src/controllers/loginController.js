const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req,res)=>{
    const {email,password} =req.body;
    // secrets are exposed!
    const accessTokenSecret = "47dcf8657d45fc61ca0dd620e106eda3a79aff3739a5ce4b3f7c3cfb38d44f90f1ad4b7411a0e15716d929b08cc74e88e74888c6bef6113b1cba7a0f361a54a8";
    const refreshTokenSecret = "39aca2a6f80dece0b82b0f62d0c65e1eac25610bdc1e37a820fd0363f4cb402d0962dd3f4e3db64dc034d3dd1904d8e778d4d9c4421f41ed222bd814c3d9180d";
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
            const accessToken = jwt.sign(
                { email: user.email },
                accessTokenSecret,
                { expiresIn: '15m'}
            );
            const refreshToken = jwt.sign(
                { email: user.email },
                refreshTokenSecret,
                { expiresIn: '1d'}
            );
            user.refreshToken = refreshToken;
            await user.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({message:"Login success", accessToken: accessToken});
        }
        else {
            res.status(401).json({message:"Wrong credentials"});
        }
    } catch(err) {
        console.error(err);
    }
}

module.exports = {login}