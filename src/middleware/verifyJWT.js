const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // secret is exposed!
    const accessTokenSecret = "47dcf8657d45fc61ca0dd620e106eda3a79aff3739a5ce4b3f7c3cfb38d44f90f1ad4b7411a0e15716d929b08cc74e88e74888c6bef6113b1cba7a0f361a54a8";
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        accessTokenSecret,
        (err, decoded) => {
            if (err) return res.status(403).json({message: "invalid token"}); 
            req.email = decoded.email;
            next();
        }
    );
}

module.exports = verifyJWT