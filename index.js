const express = require('express');
const path = require('path');
const http = require('http');
const process = require('process');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));

app.get('/prueba-error', (req, res) => {
	res.send({ success: true, mensaje: 'hola' });
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic Happens on port:${port}`));
