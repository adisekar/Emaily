const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User'); // Mongoose model need to be created before calling passport in below line
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
        keys: [keys.cookieKey] // create encrypted random key, so ppl cannot modify in client 
    })
);
app.use(passport.initialize());
app.use(passport.session()); // tell passport to use cookie session

// App passed in authRoutes which returns a function
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Get Port from Heroku, or use local
const PORT = process.env.PORT || 5000;
app.listen(PORT);
