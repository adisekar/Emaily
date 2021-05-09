const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // if (!req.user) { // use middleware instead of check in every request
        //     return res.status(401).send({ error: 'You must log in!' });
        // }

        // Handle token and call stripe api
        // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            source: req.body.id,
            description: '5$ for 5 credits',
        });

        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
}