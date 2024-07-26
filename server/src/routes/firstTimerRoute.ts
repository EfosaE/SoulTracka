import { Router } from 'express';
import { getAllFirstTimers } from '../controllers/firstTimerController';
import validateJWT from '../middlewares/validateJWT';


const firstTimerRouter = Router();

firstTimerRouter.route('/').get(validateJWT, getAllFirstTimers)
export default firstTimerRouter;
