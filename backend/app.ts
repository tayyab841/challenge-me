import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Express, Request, Response } from 'express';

import userRoutes from './routes/userRoutes'

dotenv.config();
const app: Express = express();

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_CONN_STRING || '';

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', userRoutes);

export default app;