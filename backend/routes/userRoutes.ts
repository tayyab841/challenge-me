import express from 'express';
import {
	getPlayerStats,
} from '../controllers/userController'
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/playerStats', verifyToken, getPlayerStats)

export = router;