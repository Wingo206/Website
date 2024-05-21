const express = require('express');
const fs = require('node:fs');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();

// const colors = {
//     // 'primary_bg': '#070F2B',
//     'primary_bg': '#10121a',
//     'secondary_bg': '#070F2B',
//     'primary': '#5C469C',
//     'secondary': '#D4ADFC',
//     'text_color': '#FFFFFF' // pure white
//     // 'text_color': '#e2e1f5'
// }
const colors = {
    //'dark_bg': '#0C134F', 
    // 'light_bg': '#1D267D',
    // 'primary_bg': '#FFF2F2',
    // 'secondary_bg': '#5C469C',
    'primary': '#8EA7E9',
    'secondary': '#7286D3',
    // 'text_color': '#FFFFFF' // pure white
    // 'text_color': '#9290C3' // too blue
    'text_color': '#3a3845',
}

app.get('/', (req, res) => {
    res.end("Hello World");
});

app.get('/main_style.css', (req, res) => {
    try {
        let filepath = __dirname + path.sep + 'public' + path.sep + 'main_style.css';
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
