const express = require('express');

const port = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
    res.end("Hello World");
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
