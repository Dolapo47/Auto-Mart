import express from 'express';
import userController from '../controllers/userControllers';
import trim from '../helper/trimmer/trimmer';

const { signUpTrim, loginTrim } = trim;

const router = express.Router();

router.post('/auth/signup', signUpTrim, userController.signupUser);
router.post('/auth/signin', loginTrim, userController.loginUser);

export default router;
