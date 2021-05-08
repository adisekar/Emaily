const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        });

    app.get('/api/logout', (req, res) => {
        req.logout();
        // res.send(req.user);
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        // res.send(req.session); // shows session oid of user, which passport maintains in cookie
        res.send(req.user);
    });


    app.get('/', (req, res) => {
        res.send("Go to Route /auth/google");
    });

};