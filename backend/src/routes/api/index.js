import express from 'express';
import dashboard from './dashboard';
import student from './studentRoutes';
import courseRoutes from './courseRoutes'
import takeRoutes from   './takeRoutes';
const router = express.Router();

router.use('/dashboard', dashboard);
router.use('/student', student);
router.use('/course', courseRoutes)
router.use('/take',takeRoutes);
export default router;