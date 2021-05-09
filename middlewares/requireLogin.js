module.exports = (req, res, next) => {
    if (!req.user) { // If user does not exist
        return res.status(401).send({ error: 'You must log in!' });
    }
    next();
};