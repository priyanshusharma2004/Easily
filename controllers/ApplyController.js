import JobModel from '../models/JobModel.js';
import { sendConfirmationEmail } from '../middleware/mailer.js';

const ApplyController = {
  async postApply(req, res) {
    const { name, email, contact } = req.body;
    const jobId = req.params.id;
    const job = JobModel.getJobById(jobId);
    if (!job) return res.redirect('/404');

    if (!name || !email || !contact) {
      return res.redirect(`/jobs/${jobId}?error=All fields are required`);
    }

    const resumePath = req.file ? req.file.path : null;

    JobModel.addApplicant(jobId, { name, email, contact, resumePath });

    // Send confirmation email (best effort)
    try {
      await sendConfirmationEmail(email, name, job.jobdesignation, job.companyname);
    } catch (e) {
      console.log('Email not sent:', e.message);
    }

    res.render('jobs/applySuccess', { title: 'Application Submitted', job, name });
  }
};

export default ApplyController;
