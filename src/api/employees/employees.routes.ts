import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { authenticateAdmin , validateRequest } from '../../middlewares';
import { addEmployee , deleteEmployee , editEmployee , getEmployees } from './employees.handlers';

const router = Router();

router.get('' , getEmployees);
router.post('' , authenticateAdmin , addEmployee);
router.delete('/:id' , [authenticateAdmin , validateRequest({ params : ParamsWithId })] , deleteEmployee);
router.put('/:id' , authenticateAdmin , editEmployee);

export default router;