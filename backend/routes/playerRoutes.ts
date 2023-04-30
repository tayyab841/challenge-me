import express from 'express';
import {
	getPlayerStats,
	getPlayers
} from '../controllers/playerController'
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/all', verifyToken, getPlayers)
router.get('/stats', verifyToken, getPlayerStats);

export = router;