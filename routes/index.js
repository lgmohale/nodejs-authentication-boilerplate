const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const route = express.Router();
const db = require('../model');

//user registration
route.post('/register', (req, res) =>{

    const { user_name, user_surname, user_email, user_password } = req.body;

    let fieldValidate = [];

    if(!user_name){
        res.json({
            messege: 'Name field is required'
        });
        fieldValidate.push({msg: 'Name field is required'})
    }

    if(!user_surname){
        res.json({
            messege: 'Surname field is required'
        });
        fieldValidate.push({msg: 'Surname field is required'})
    }

    if(!user_email){
        res.json({
            messege: 'Email field is required'
        });
        fieldValidate.push({msg: 'Email field is required'})
    }

    if(!user_password){
        res.json({
            messege: 'Password field is required'
        });
        fieldValidate.push({msg: 'Password field is required'})
    }

    if(user_password.length < 8){
        res.json({
            message: 'Password must be at least 8 characters long'
        });
        fieldValidate.push({msg: 'Password must be at least 8 characters long'})
    }

    else{

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user_password, salt, (err, hash) => {
            
                const user_password = hash
                
                db.findOne({where: {user_email: user_email}})
                .then(user =>{
                    if(!user){
                        db.create({
                            user_name,
                            user_surname,
                            user_email,
                            user_password
                        })
                        .then(user =>{
                            res.json({
                                message: 'new user successfully registered'
                            })
                            console.log('New user: ', user)
                        })
                        .catch(err =>{
                            res.json({
                                message: 'User could not be added'
                            })
                            console.log('Oops something went wrong while registaring new user: ', err)
                        })
                    }
                    else{
                        res.json({
                            message: 'Email already exists, please log in'
                        })
                        console.log(user.user_email, ' already exists')
                    }
                })
                .catch(err =>{
                    res.json({
                        message: 'something went wrong while search for the email'
                    })
                    console.log('Oops, something went wrong while search for the email: ', err)
                })
            });
        });
    }
});

//user login
route.post('/login', (req, res, next)=>{
    console.log('hello')
    passport.authenticate('LocalStrategy', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
})

module.exports = route;