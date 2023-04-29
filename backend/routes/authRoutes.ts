import express from 'express';
import userLogout, {
    userLogin,
    userSignup,
} from '../controllers/authController'

const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.post('/logout', userLogout);

export = router;