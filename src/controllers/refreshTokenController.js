const User = require('../models/User');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    const refreshToken  = req.cookies.jwt;
    // secret is exposed! 
    const accessTokenSecret = "47dcf8657d45fc61ca0dd620e106eda3a79aff3739a5ce4b3f7c3cfb38d44f90f1ad4b7411a0e15716d929b08cc74e88e74888c6bef6113b1cba7a0f361a54a8";
    const refreshTokenSecret = "39aca2a6f80dece0b82b0f62d0c65e1eac25610bdc1e37a820fd0363f4cb402d0962dd3f4e3db64dc034d3dd1904d8e778d4d9c4421f41ed222bd814c3d9180d";


    try {
        const user = await User.findOne({refreshToken}).exec();
        if (!user) {
            return res.status(403).json({message: "Unable to refresh token"});
        }
        jwt.verify(
            refreshToken,
            refreshTokenSecret,
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({message: "Unable to refresh token"});
                }
                if (user.email !== decoded.email) {
                    return res.status(403).json({message: "Unable to refresh token"});
                }
                const accessToken = jwt.sign(
                    { email: user.email},
                    accessTokenSecret,
                    { expiresIn: '15m' }
                );
                res.status(200).json({ message: "Access token refreshed", accessToken: accessToken});
            }
        );
    } catch(err) {
        console.error(err);
    }

}

module.exports = {refreshToken}