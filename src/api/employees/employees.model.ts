import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const EmployeesModel = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic:z.string().min(1),
  description:z.string().min(1),
  image:z.string()
});

export type Employee = z.infer<typeof EmployeesModel>;
export type EmployeeId = WithId<Employee>;
export const Employees = db.collection<Employee>('employees');
