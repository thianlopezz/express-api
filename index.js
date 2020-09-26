const express = require('express');
const path = require('path');
const http = require('http');
const process = require('process');
const bodyParser = require('body-parser');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));

app.get('/cambio-estado/:idOrden/:nuevoEstado', async (req, res) => {
	console.log('Nueva llamada! GET!');
	try {
		let { idOrden, nuevoEstado } = req.params;

		const WooCommerce = new WooCommerceRestApi({
			url: 'https://juanmarcet.com',
			consumerKey: 'ck_9898a922d83343c5456c9883d88d7a53525cd8f2',
			consumerSecret: 'cs_9548049fa88df40582e560d54161b72a8e94eb00',
			version: 'wc'
		});

		let response = await WooCommerce.post(`extended/cambio-estado`, {
			idOrden,
			nuevoEstado
		});

		res.send(response.data);
	} catch (e) {
		console.log(e);
		res.status(500).send({ success: false, error: e });
	}
});

app.post('/cambio-estado', async (req, res) => {
	console.log('Nueva llamada! POST!');
	try {
		let { idOrden, nuevoEstado, metadata } = req.body;

		const WooCommerce = new WooCommerceRestApi({
			url: 'https://juanmarcet.com',
			consumerKey: 'ck_9898a922d83343c5456c9883d88d7a53525cd8f2',
			consumerSecret: 'cs_9548049fa88df40582e560d54161b72a8e94eb00',
			version: 'wc'
		});

		let response = await WooCommerce.post(`extended/cambio-estado/`, {
			idOrden,
			nuevoEstado,
			metadata
		});

		res.send(response.data);
	} catch (e) {
		console.log(e);
		res.status(500).send({ success: false, error: e });
	}
});

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
