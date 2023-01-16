const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()

//Initializing our app and setting our port - 8000 is for local development.
const app = express()
const PORT = process.env.PORT || 8000;

//Our MongoDB connection URI - Will need to be hidden in production! Contains our Login Name, Password, and directs us to the "Politicians" database.
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch(err) {
        console.error(err)
    }
}

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// domain needs to be updated
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/politician', require('../src/routes/api/politician'));
app.use('/user', require('../src/routes/user'));
app.use('/login', require('../src/routes/login'));
app.use('/signup', require('../src/routes/signup'));
app.use('/recaptcha', require('../src/routes/recaptcha'));

mongoose.connection.once('open', () => {
    console.log('Connected to DD database with MongoDB');
    app.listen(PORT, console.log(`Server is starting at ${PORT}`));
})