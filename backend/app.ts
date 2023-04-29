import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Express, Request, Response } from 'express';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app: Express = express();

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_CONN_STRING || '';

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(express.urlencoded({ extended: false }));

app.use('/user/', userRoutes);
app.use('/auth/', authRoutes);

export default app;