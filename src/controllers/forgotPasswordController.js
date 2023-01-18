const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const forgotpassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email: email}).exec();
        if (!user){
            return res.status(200).json({message:"No user found"});
        }
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const hashedToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
        user.resetPasswordToken = hashedToken;
        user.resetPasswordTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();
        // replace domain 
        const resetPasswordLink = `localhost:3000/resetpassword/${resetPasswordToken}`;

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
            to: email,
            subject: "Reset your password", 
            html: `<p>Hi ${user.name},</p><p>Someone has requested a password reset for the account associated with this email. 
            Click on the button below to reset your password.</p> <a href='${resetPasswordLink}' style="text-decoration:none;
            width: 200px; padding: 15px; border-radius: 12px; font-weight: MEDIUM; background: blue; color: white; cursor: pointer; 
            font-size: 110%;">Reset Password</a>`, 
        });
        res.status(200).json({message: "Email sent successfully", info:nodemailer.getTestMessageUrl(info)});
    } catch(err) {
        res.sendStatus(400);
    }
}

module.exports = {forgotpassword}