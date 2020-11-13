const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

// Gte Port from Heroku, or use local
const PORT = process.env.PORT || 5000;
app.listen(PORT);