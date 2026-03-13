import express from 'express';
import ApplyController from '../controllers/ApplyController.js';
import { upload } from '../middleware/fileUpload.js';

const router = express.Router();

router.post('/:id', upload.single('resume'), ApplyController.postApply);

export default router;
