const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { MONGODB } = require('./config');
const userRoutes = require('./routes/user');
const formRoutes = require('./routes/form');
const auth = require('./middleware/auth');

//Parsing req body as json
app.use(bodyParser.json());

//Route handling for saving and deleting form
app.use('/form', auth, formRoutes);

//Route handling for user registration and login
app.use('/', userRoutes);

//Error handled for invalid url requests
app.use((req, res, next) => {
    const err = new Error('Invalid request url');
    err.status = 404;
    next(err);
});

//Database connection initialized
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        console.log('Connected to mongodb');
        return app.listen(8592);
    })
    .then(() => console.log('Server is up and running'))
    .catch(err => console.log(err.message));
