const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

const googleLogin = async (req,res)=>{

    // secrets are exposed!
    const accessTokenSecret = "47dcf8657d45fc61ca0dd620e106eda3a79aff3739a5ce4b3f7c3cfb38d44f90f1ad4b7411a0e15716d929b08cc74e88e74888c6bef6113b1cba7a0f361a54a8";
    const refreshTokenSecret = "39aca2a6f80dece0b82b0f62d0c65e1eac25610bdc1e37a820fd0363f4cb402d0962dd3f4e3db64dc034d3dd1904d8e778d4d9c4421f41ed222bd814c3d9180d";
    const clientId = '809363406953-ud4ktm7gi34c5mm4qhkqh00o90mnq5jc.apps.googleusercontent.com';

    const client = new OAuth2Client(clientId);
    const token = req.body.credential;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId
        });
        const payload = ticket.getPayload();
        const name = payload.given_name + ' ' + payload.family_name;
        const email = payload.email;
   
        console.log("token verified");

        var user = await User.findOne({email:email}).exec();
        if (!user){
            user = await User.create({name,email});
        }

        const accessToken = jwt.sign(
            { email: email },
            accessTokenSecret,
            { expiresIn: '15m'}
        );
        const refreshToken = jwt.sign(
            { email: email },
            refreshTokenSecret,
            { expiresIn: '1d'}
        );
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({message:"Login success", accessToken: accessToken});
    } catch(err) {
        console.error(err);

    }
}

module.exports = {googleLogin}