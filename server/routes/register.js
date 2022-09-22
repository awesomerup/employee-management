const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Employee = require('../models/employee');


router.post('/api/register', (req, res) => {
    const { fullname, email, password, empid, mobile } = req.body;

    if (!fullname || !email || !password || !empid || !mobile) {
        return res.status(422).json({ error: "please fill all the fields" })
    }
    Employee.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(422).json({ error: 'User already exist' })
            }
            bcrypt.hash(password, 12).then(hashedPassword => {
                if (hashedPassword) {
                    const employee = new Employee({
                        fullname,
                        email,
                        password: hashedPassword,
                        empid,
                        mobile
                    })
                    employee.save()
                        .then(() => res.json({ msg: "Registered successfully" }))
                        .catch(err => console.log(err))
                }
            })



        })
        .catch(err => console.log(err))
})


module.exports = router;