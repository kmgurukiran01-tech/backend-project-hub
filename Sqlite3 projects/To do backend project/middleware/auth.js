const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {

    const author = req.header("authorization");

    if (!author) {
        return res.status(401).json({
            message: "Authorization header missing",
        });
    }

    const jwtToken = author.split(" ")[1];

    if (!jwtToken) {
        return res.status(401).json({
            message: "Token missing",
        });
    }

    jwt.verify(
        jwtToken,
        process.env.JWT_SECRET,
        (error, decoded) => {

            if (error) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                });
            }

            req.userId = decoded.userId;

            next();
        }
    );
};

module.exports = authentication;
