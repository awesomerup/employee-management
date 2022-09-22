const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const verifyEmployee = require('../middleware/verifyEmployee');

router.delete('/api/employee/:id/delete', verifyEmployee, (req, res) => {
    Employee.findByIdAndDelete(req.params.id, { new: true })
        .select('-password')
        .then(data => res.json(data))
        .catch(err => console.log(err))
})


router.put('/api/employee/:id/update', verifyEmployee, (req, res) => {
    const { fullname, email, empid, mobile } = req.body
    Employee.findByIdAndUpdate(req.params.id, {
        $set: { fullname, email, empid, mobile }
    })
        .select('-password')
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: 'not succesfull' })
            } else {
                res.json(result)
            }
        })
})

module.exports = router;