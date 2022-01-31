import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';

import indexRoutes from './routes/index';



const app = express();

// dotenv
dotenv.config();

// port
const port = process.env.PORT;
const portDefault: number = 8000;

// settings
app.set( 'port', port || portDefault );

// middlewares
app.use( morgan('dev') );
app.use( express.json() ); // configuration to send or receive .json

// routes
app.use('/api', indexRoutes);

// this folder for this application will be used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));



export default app;
