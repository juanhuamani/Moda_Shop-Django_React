import { Router } from 'express';
const router = Router();

import userRoutes from './users.routes.js';

router.use('/user', userRoutes);

export default router;