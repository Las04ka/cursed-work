import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const UsersModel = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  salt: z.string().nullable().default(null),
  role: z.enum(['admin', 'user']).default('user'),
});

export type User = z.infer<typeof UsersModel>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');
