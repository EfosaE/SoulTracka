import { Router } from 'express';
import {
  createContact,
  deleteAll,
  getAllContacts,
  getContactByID,
  updateContact,
} from '../controllers/outreachController';
import validateJWT from '../middlewares/validateJWT';

const outreachRouter = Router();

outreachRouter.use(validateJWT);
outreachRouter
  .route('/')
  .get(getAllContacts)
  .post(createContact)
  .delete(deleteAll);
// outreachRouter.route('/create-many').post(createManyContact)
outreachRouter.route('/:id').get(getContactByID).delete().patch(updateContact);

export default outreachRouter;
