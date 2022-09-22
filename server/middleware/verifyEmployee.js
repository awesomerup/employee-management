const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/keys');
const Employee = require('../models/employee');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in." })
    }
    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in." })
        }

        const { _id } = payload;
        Employee.findById(_id)
            .then(loggedUser => {
                req.employee = loggedUser;
                next();
            })
            .catch(err => console.log(err))
    })
}

