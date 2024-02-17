const { Users } = require('../models');
const { generateToken } = require('../utils/token');

exports.findAll = (req, res) => {
    Users.find({})
        .then((data) => { res.status(200).send(data) })
        .catch(e => { res.status(400).send(e) });
}

exports.login = (req, res) => {
    if (!req.body.username) {
        return res.status(400).send("Username not found")
    }

    Users.findOne({
        "username": req.body.username
    })
        .then(data => {
            // Convert Mongoose document to plain JavaScript object
            const resp = data.toJSON();
            const token = generateToken(data);

            resp["accessToken"] = token
            res.status(200).send(resp);
        })
        .catch(e => res.status(400).send(e.message))
}

exports.create = (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Missing fields");
    }

    const User = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
    });

    Users.findOne({ 'username': username })
        .then((userData) => {
            if (userData) {
                throw new Error("Username already exists")
            }

            const token = generateToken(payload);

            return User.save(User)
        })
        .then(data => res.status(201).send(data))
        .catch(e => res.status(400).send(e.message))
}