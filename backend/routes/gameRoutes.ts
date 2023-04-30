import express from 'express';
import {
    getGames
} from '../controllers/gameController'
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/all', verifyToken, getGames);

export = router;