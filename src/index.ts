import express from 'express';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors());
app.use('/', express.static('/home/jon13210/www/johnsanders.tv/'));

server.listen(3000, 'localhost');
server.on('listening', () => {
	console.log('Server started.');
});
