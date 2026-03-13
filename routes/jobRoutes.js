import express from 'express';
import JobController from '../controllers/JobController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', JobController.getAllJobs);
router.get('/new', requireAuth, JobController.getNewJob);
router.post('/', requireAuth, JobController.postNewJob);
router.get('/:id', JobController.getJobDetails);
router.get('/:id/update', requireAuth, JobController.getUpdateJob);
router.post('/:id/update', requireAuth, JobController.postUpdateJob);
router.get('/:id/delete', requireAuth, JobController.deleteJob);
router.get('/:id/applicants', requireAuth, JobController.getApplicants);

export default router;
