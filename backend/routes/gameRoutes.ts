import express from 'express';
import {
    endGame,
    getGames
} from '../controllers/gameController'
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/all', verifyToken, getGames);
router.post('/end', verifyToken, endGame);

export = router;