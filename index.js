const express = require('express');
const fs = require('node:fs');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();

const colors = {
    'bg_color': '#FF0000',
    'text_color': '#00FF00'
}

app.get('/', (req, res) => {
    res.end("Hello World");
});

app.get('/home_style.css', (req, res) => {
    try {
        let filepath = __dirname + path.sep + 'public' + path.sep + 'home_style.css';
        let text = fs.readFileSync(filepath, 'utf8');

        // substitute in color variables
        for (const [key, value] of Object.entries(colors)) {
            text = text.replaceAll(`{{${key}}}`, value);
        }


        res.type('css')
        res.end(text);
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Error reading file')
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
