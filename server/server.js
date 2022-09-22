const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/employee')
    .then(() => console.log('connected'))
    .catch(err => console.log(err))

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/register'))
app.use(require('./routes/post'))
app.use(require('./routes/admin'))


app.listen(5000, () => console.log("server is running on port 5000"))