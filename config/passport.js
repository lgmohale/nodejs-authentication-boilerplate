const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db  = require('../model');

module.exports = (passport) =>{
    passport.use(
        new LocalStrategy({ user_email: user_email}, (user_email, user_password, done) =>{

            db.findOne({where: {user_email: user_email}})
            .then(user =>{
                if(!user){
                    res.json({
                        message: 'user does not exists, register as new user'
                    })
                    return done(null, false, { message: 'That email is not registered' });
                }
                else{

                    bcrypt.compare(user_password, user.user_password, (err, isMatch) =>{
                        if(err) throw  err;
                        if(isMatch){
                            return done(null, user);
                        }
                        else{
                            return done(null, false, {message: 'Passowrd do not match'})
                        }
                    })
                }
            })
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
      });
    
    passport.deserializeUser((user_id, done) => {
        db.findById(user_id, (err, user) => {
          done(err, user);
        });
    });
}