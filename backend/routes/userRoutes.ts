import express from 'express';
const router = express.Router();
import {
	userLogin,
	userSignup,
	getAllUsers,
} from '../controllers/userController'

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.get('/getAll', getAllUsers);

export = router;