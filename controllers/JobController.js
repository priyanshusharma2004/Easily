import JobModel from '../models/JobModel.js';

const JobController = {
  getAllJobs(req, res) {
    const search = req.query.search || '';
    const jobs = JobModel.getAllJobs(search);
    res.render('jobs/index', { title: 'All Jobs', jobs, search });
  },

  getJobDetails(req, res) {
    const job = JobModel.getJobById(req.params.id);
    if (!job) return res.redirect('/404');
    res.render('jobs/details', { title: job.jobdesignation, job });
  },

  getNewJob(req, res) {
    res.render('jobs/new', { title: 'Post a Job', error: null });
  },

  postNewJob(req, res) {
    const { jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings } = req.body;
    if (!jobcategory || !jobdesignation || !joblocation || !companyname || !salary || !applyby || !skillsrequired || !numberofopenings) {
      return res.render('jobs/new', { title: 'Post a Job', error: 'All fields are required.' });
    }
    const job = JobModel.createJob({
      jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings,
      recruiterId: req.session.user.id
    });
    res.redirect('/jobs/' + job.id);
  },

  getUpdateJob(req, res) {
    const job = JobModel.getJobById(req.params.id);
    if (!job) return res.redirect('/404');
    if (job.recruiterId !== req.session.user.id) {
      return res.status(403).render('404', { title: 'Unauthorized' });
    }
    res.render('jobs/update', { title: 'Update Job', job, error: null });
  },

  postUpdateJob(req, res) {
    const job = JobModel.getJobById(req.params.id);
    if (!job) return res.redirect('/404');
    if (job.recruiterId !== req.session.user.id) {
      return res.status(403).render('404', { title: 'Unauthorized' });
    }
    const { jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings } = req.body;
    JobModel.updateJob(req.params.id, { jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings });
    res.redirect('/jobs/' + req.params.id);
  },

  deleteJob(req, res) {
    const job = JobModel.getJobById(req.params.id);
    if (!job) return res.redirect('/404');
    if (job.recruiterId !== req.session.user.id) {
      return res.status(403).render('404', { title: 'Unauthorized' });
    }
    JobModel.deleteJob(req.params.id);
    res.redirect('/jobs');
  },

  getApplicants(req, res) {
    const job = JobModel.getJobById(req.params.id);
    if (!job) return res.redirect('/404');
    if (job.recruiterId !== req.session.user.id) {
      return res.status(403).render('404', { title: 'Unauthorized' });
    }
    res.render('jobs/applicants', { title: 'Applicants', job, applicants: job.applicants });
  }
};

export default JobController;
