import express from 'express';
import {
    getChallenges,
    newChallenge
} from '../controllers/challengeController'
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/all', verifyToken, getChallenges);
router.post('/create', verifyToken, newChallenge);

export = router;