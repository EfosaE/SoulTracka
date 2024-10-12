import { Router } from 'express';
import { createFirstTimer, deleteFirstTimerByID, getAllFirstTimers, updateFirstTimer } from '../controllers/firstTimerController';
import validateJWT from '../middlewares/validateJWT';


const firstTimerRouter = Router();

firstTimerRouter.use(validateJWT);

firstTimerRouter.route('/').get(getAllFirstTimers).post(createFirstTimer)
firstTimerRouter
  .route('/:id')
  .delete(deleteFirstTimerByID).patch(updateFirstTimer)
export default firstTimerRouter;
