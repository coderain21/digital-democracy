const User = require('../models/User');

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(200).json({message: "No cookies"});
    }
    const refreshToken = cookies.jwt;
    if (!refreshToken) {
        return res.status(200).json({message: "No refresh token"});
    }
    const user = await User.findOne({refreshToken}).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(200).json({message: "No user"});
    }
    user.refreshToken = '';
    await user.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({message: "Logout successful"});

}
module.exports = {logout}