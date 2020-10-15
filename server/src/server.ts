import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import 'express-async-errors';

import routes from './routes';

import errorHandler from './errors/handler';
import './database/connection';

const app = express();
const PORT = process.env.PORT || 8080

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
//Possibilita que as imagens sejam acessadas pela URI retornada
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(PORT);
console.log(`----\n----\nListening on port ${PORT}\n----\n----`);