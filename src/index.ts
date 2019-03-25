import initPassport from './config/passport';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

mongoose
	.connect('mongodb://localhost/typeretriever')
	.then(() => console.log('Mongo connected'))
	.catch(e => console.error(e));

initPassport();

import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();
const server = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use('/', express.static('/home/jon13210/www/johnsanders.tv/'));

server.listen(3000, 'localhost');
server.on('listening', () => {
	console.log('Server started.');
});
