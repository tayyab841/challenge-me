import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Express, Request, Response } from 'express';

import authRoutes from './routes/authRoutes';
import playerRoutes from './routes/playerRoutes';
import challengeRoutes from './routes/challengeRoutes';

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

app.use('/auth/', authRoutes);
app.use('/player', playerRoutes);
app.use('/challenge', challengeRoutes);

export default app;