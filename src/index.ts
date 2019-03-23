import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(express.static('/home/cnnitouch/www/johnsanders.tv'));

server.listen(3000, 'localhost');
server.on('listening', () => {
	console.log('Server started.');
});
