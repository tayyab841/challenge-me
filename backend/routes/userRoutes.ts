import express from 'express';
const router = express.Router();
import { userSignup, userLogin, deleteAllUsers, getAllUsers, decodeUserToken } from '../controllers/userController'

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.get('/getAll', getAllUsers);
router.post('/decode', decodeUserToken);
router.delete('/deleteAll', deleteAllUsers);

export = router;