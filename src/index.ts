import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import initUsers from './models/users';
import initPassport from './config/passport';
import routes from './routes/index';

mongoose.promise = global.Promise;
mongoose.connect('mongodb://johnsanders.tv/typeretriever');
mongoose.set('debug', true);

createUsers();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(routes);
app.use('/', express.static('/home/jon13210/www/johnsanders.tv/'));

server.listen(3000, 'localhost');
server.on('listening', () => {
	console.log('Server started.');
});
