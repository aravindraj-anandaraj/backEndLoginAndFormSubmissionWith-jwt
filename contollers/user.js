const User = require('./../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('./../config')

exports.register = async (req, res, next) => {

    //Hashing passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //New user validation
    const userExist = await User.findOne({ userName: req.body.userName });
    if(userExist)
        return res.status(400).json({ error: { message: 'User name already exists'}});
    //Creating a new user with hashed password
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: hashPassword
    });
    await newUser.save();
    const jwtToken = getSignedToken(newUser);
    res.status(200).json({ jwtToken });
};

exports.login = async (req, res, next) => {
    const user = await User.findOne({ userName: req.body.userName });
    if(!user)
        return res.status(400).json({ error: { message: 'User name does not exists'}});
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)
        return res.status(400).json({ error: { message: 'Password is invalid'}});
    const jwtToken = getSignedToken(user);
    res.status(200).json({ jwtToken });
};

getSignedToken = user => {
    return jwt.sign({
        id: user.id,
        userName: user.userName,
        password: user.password
    }, 
    SECRET_KEY, 
    {
        expiresIn: '1h'
    })
};