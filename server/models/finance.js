const mongoose = require('mongoose')

const financeSchema = new mongoose.Schema({
    bank: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    accountno: {
        type: String,
        required: true
    },
    empdata: { type: mongoose.Types.ObjectId, ref: "User" }
})

const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;