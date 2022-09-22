const mongoose = require('mongoose')

var employeeSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    empid: { type: String, required: true },
    mobile: { type: String },
    photo: { type: String, default: 'https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1' },
    date: { type: Date, default: Date.now }
});

var Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;