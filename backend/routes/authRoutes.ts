import express from 'express';
import {
    userLogin,
    userSignup,
    userLogout
} from '../controllers/authController'
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.post('/logout', verifyToken, userLogout);

export = router;