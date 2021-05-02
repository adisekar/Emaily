const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// get instance of the mongo db collection of users
const User = mongoose.model('users');

// passport automatically calls serialize and deserialize user after sucessfull callback to set cookie with id
// the id here is the user object id (oid) in mongodb
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => done(null, user));
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
        // we have record with given profile ID, don't create new one
        return done(null, existingUser);
    }
    const user = await new User({ googleId: profile.id }).save()
    // .then(user => done(null, user));
    done(null, user);
}
));