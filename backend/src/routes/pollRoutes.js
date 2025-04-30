import express from 'express';
import { createPoll } from '../controller/pollController.js';
import e from 'express';

const router = express.Router();

router.post('/', createPoll)

export default router;