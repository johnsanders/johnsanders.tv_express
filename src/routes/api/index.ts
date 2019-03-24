import express from 'express';
const router = express.Router();

router.use('/users', require('./users'));

export default router;
