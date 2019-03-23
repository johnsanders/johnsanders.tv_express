import express from 'express';
import http from 'http';

const app = express();
const  server = http.createServer(app);

app.get('/', (req, res) => {
	res.send("Well hey there.");
});

server.listen(3000, 'localhost');
server.on('listening', () => {
	console.log('Server started.');
});

