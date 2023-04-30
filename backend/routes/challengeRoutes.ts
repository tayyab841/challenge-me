import express from 'express';

import {
    acceptChallenge,
    newChallenge
} from '../controllers/challengeController'
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create', verifyToken, newChallenge);
router.post('/accept', verifyToken, acceptChallenge);

export = router;