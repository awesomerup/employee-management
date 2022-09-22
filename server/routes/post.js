const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const verifyEmployee = require('../middleware/verifyEmployee');

//get employee data

router.get(`/api/employee/:id`, verifyEmployee, (req, res) => {
    Employee.findById(req.params.id)
        .select('-password')
        .then(employee => res.json({ employee }))
        .catch(err => console.log(err))
})

//get all employee data

router.get('/api/allemployee', verifyEmployee, (req, res) => {
    Employee.find()
        .select('-password')
        .then(employeelist => res.json(employeelist))
        .catch(err => console.log(err))
})

router.put('/api/employee/:id/setmobile', verifyEmployee, (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        $set: { mobile: req.body.mobile }
    },
        {
            new: true
        }
    ).exec((err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result)
    })
})
router.put('/api/employee/:id/setphoto', verifyEmployee, (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        $set: { photo: req.body.photo }
    },
        {
            new: true
        }
    ).exec((err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result)
    })
})

module.exports = router