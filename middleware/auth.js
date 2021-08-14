const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./../config');

module.exports = ((req, res, next) => {
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 400;
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try{
                const user = jwt.verify(token, SECRET_KEY);
                req.user = user;
                return next();
            } catch(e) {
                error.message = 'Invalid/expired jwt token';
                return next(error);
            }
        }
        error.message = 'Authorization token must be Bearer [jwt token]';
        return next(error);
    }
    error.message = 'Authorization header must be provided';
    return next(error);
});