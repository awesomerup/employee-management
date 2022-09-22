const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const Employee = require('../models/employee');

router.post("/api/login", (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please fill all the fields" })
    } else {
        Employee.findOne({ email })
            .then(savedUser => {
                if (!savedUser) {
                    return res.status(422).json({ error: "Invalid username and password" })
                } else {
                    bcrypt.compare(password, savedUser.password)
                        .then(isMatched => {
                            if (isMatched) {
                                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                                const { _id, email, fullname, empid, location, DOJ, mobile, designation, photo } = savedUser;
                                res.json({ token, employee: { _id, email, fullname, empid, location, DOJ, mobile, designation, photo } })
                            } else {
                                res.status(422).json({ error: "Invalid username and password" })
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
}
)

module.exports = router;