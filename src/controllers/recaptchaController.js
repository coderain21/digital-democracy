const axios = require('axios');

const recaptcha = async (req, res) => {
    const {token} = req.body;

    try {
        // secret key is exposed
        await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=6Lf02yQjAAAAAN4sUzP_o3PnlLLppjAfhA56IvnL&response=${token}`
            );
        res.status(200).json({message: "Recaptcha success"});
    } catch (err) {
        res.status(400).json({message: "Recaptcha failed"});
        console.error(err);
    }
}

module.exports = {recaptcha}