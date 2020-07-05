const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
const config = require('../config/key');

const checkAuth = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return next(new HttpError('Authentication failed', 401));
        }

        const decodedToken = jwt.verify(token, config.secretKey);
        req.userData = {id: decodedToken.id};
        next();
    } catch(err) {
        return next(new HttpError('Authentication failed', 401));
    }
   
}

module.exports = checkAuth;