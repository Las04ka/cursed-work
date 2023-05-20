import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import { authenticateAdmin } from '../middlewares';
import employees from './employees/employees.routes';
import auth from './auth/auth.routes';
import blogPostRoutes from "./news/blog-post.routes";

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});

router.use('/auth', auth);
router.use('/employee', employees);
router.use('/blog', blogPostRoutes)

export default router;
