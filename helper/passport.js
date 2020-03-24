const bcrypt = require('bcryptjs');
const _user = require('../apis/user/model').User;
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                let user = await _user.getByEmail(email);
                bcrypt.compare(password, user._password, (error,res) => {
                    if (error) return done(error);
                    if(res===false) new Error('Incorrect passwword')
                    return done(null,user);
                });
            } catch (error) {
                return done(error);
            }
        }
    ))
};