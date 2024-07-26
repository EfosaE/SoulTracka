import { Router } from 'express';
import { login, logOut, signUp } from '../controllers/authController';
import { getAllUsers, getUserProfile } from '../controllers/userController';
import verifyPassword from '../middlewares/verifyPassword';
import validateJWT from '../middlewares/validateJWT';

const userRouter = Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(verifyPassword, login);
userRouter.route('/').get(validateJWT, getAllUsers);
userRouter.route('/profile').get(validateJWT, getUserProfile)
userRouter.route('/logout').get(logOut);
export default userRouter;
