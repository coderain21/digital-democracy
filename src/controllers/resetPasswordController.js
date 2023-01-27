const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const resetpassword = async (req, res) => {
    const {resetToken, password} = req.body;
    try {
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const user = await User.findOne({resetPasswordToken: hashedToken}).exec();
        if (!user){
            return res.status(400).json({message:"Invalid reset token"});
        }
        if (user.resetPasswordTokenExpiry < Date.now()) {
            return res.status(400).json({message:"Reset token expired"})
        }
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiry = null;
        const encryptedPass = await bcrypt.hash(password, 10);
        user.password = encryptedPass;
        await user.save();

        // replace testaccount info with actual dd email
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
        });
        const info = await transporter.sendMail({
            // replace sender email with dd email
            from: '"Digital Democracy" <foo@example.com>',
            to: user.email,
            subject: "Reset your password", 
            html: `<p>Hi ${user.name},</p><p>Your password has successfully been reset. Click the button below
            to login. </p> <a href='localhost:3000/login/' style="text-decoration:none;
            width: 200px; padding: 15px; border-radius: 12px; font-weight: MEDIUM; background: blue; color: white; cursor: pointer; 
            font-size: 110%;">Login</a>`, 
        });
        res.status(200).json({message: 'Password reset successfully', info:nodemailer.getTestMessageUrl(info)});
    } catch(err) {
        res.status(400).json({message: "Password reset unsuccessfull"});
    }
}

module.exports = {resetpassword}