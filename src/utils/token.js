const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
    const { id, username } = payload

    const jwtToken = jwt.sign(
        {
            "userId": id,
            username
        },
        process.env.JWT_SECRET,
    );

    return jwtToken;

}

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization ?? null;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                res.status(400).send(err.message)
            }

            req.user = decoded;
            next();
        });
    } else
        res.status(400).send("Missing auth token");
}