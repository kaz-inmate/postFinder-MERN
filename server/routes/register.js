const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const config = require('../config/key');
const {check, validationResult} = require('express-validator');

const createToken = id => {
    return  jwt.sign({id}, config.secretKey, {expiresIn: '1h'});

}

router.get('/users', async(req, res, next) => {
  let users;
    try {
        users = await User.find({});
    } catch (error) {
        return next(new HttpError('Something went wrong. Please try again', 500));
    }
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});


router.post('/signup', 
    [
        check('name', 'Please provide a name').not().isEmpty(),
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Password must be atleast 5 characters').isLength({min:5})

    ],

async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Please the correct credentials', 400));
    }
    const {name, email, password} = req.body;
    let newUser;
    try {
        newUser = await User.findOne({email});
        if (newUser) {
            return next(new HttpError('This email is already registered', 400));
        }
        newUser = new User({
            name, 
            email,
            password
        });

        await newUser.save()

        const token = createToken(newUser._id);
        res.status(200).json({
                 status: 'success',
                 token,
                 data: {
                     user: newUser
                 }
        });
    } catch (error) {
        return next(new HttpError('Something went wrong. Please try again', 500));
    }
    
   
});

router.post('/login',
[
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be atleast 5 characters').exists()

],
async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HttpError('Need required fields', 400))
    }

    let user;
    try {
         user = await User.findOne({email}).select('+password');
         if(!user || !(await user.comparePassword(password, user.password))) {
            return next(new HttpError('Incorrect credentials', 401));
        }
    
        const token = createToken(user._id);
        res.status(200).json({
            status:'success',
            token
        });

    } catch (error) {
        return next(new HttpError('Something went wrong', 500));
    }
   
   
});

module.exports = router;

