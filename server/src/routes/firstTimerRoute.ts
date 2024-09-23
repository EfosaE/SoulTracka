import { Router } from 'express';
import { createFirstTimer, getAllFirstTimers } from '../controllers/firstTimerController';
import validateJWT from '../middlewares/validateJWT';


const firstTimerRouter = Router();

firstTimerRouter.use(validateJWT);

firstTimerRouter.route('/').get(getAllFirstTimers).post(createFirstTimer)
export default firstTimerRouter;
