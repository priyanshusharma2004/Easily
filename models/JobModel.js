import { v4 as uuidv4 } from 'uuid';

let jobs = [];

const JobModel = {
  getAllJobs(search = '') {
    if (search) {
      const s = search.toLowerCase();
      return jobs.filter(j =>
        j.jobdesignation.toLowerCase().includes(s) ||
        j.jobcategory.toLowerCase().includes(s) ||
        j.companyname.toLowerCase().includes(s) ||
        j.joblocation.toLowerCase().includes(s)
      );
    }
    return jobs;
  },

  getJobById(id) {
    return jobs.find(j => j.id === id);
  },

  createJob({ jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings, recruiterId }) {
    const job = {
      id: uuidv4(),
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired: Array.isArray(skillsrequired) ? skillsrequired : skillsrequired.split(',').map(s => s.trim()),
      numberofopenings,
      jobposted: new Date(),
      recruiterId,
      applicants: []
    };
    jobs.push(job);
    return job;
  },

  updateJob(id, data) {
    const idx = jobs.findIndex(j => j.id === id);
    if (idx === -1) return null;
    jobs[idx] = {
      ...jobs[idx],
      ...data,
      skillsrequired: Array.isArray(data.skillsrequired)
        ? data.skillsrequired
        : data.skillsrequired.split(',').map(s => s.trim())
    };
    return jobs[idx];
  },

  deleteJob(id) {
    const idx = jobs.findIndex(j => j.id === id);
    if (idx === -1) return false;
    jobs.splice(idx, 1);
    return true;
  },

  addApplicant(jobId, applicant) {
    const job = this.getJobById(jobId);
    if (!job) return null;
    const newApplicant = {
      applicantId: uuidv4(),
      ...applicant
    };
    job.applicants.push(newApplicant);
    return newApplicant;
  },

  getAllApplicants(jobId) {
    const job = this.getJobById(jobId);
    return job ? job.applicants : [];
  },

  getApplicantById(jobId, applicantId) {
    const job = this.getJobById(jobId);
    if (!job) return null;
    return job.applicants.find(a => a.applicantId === applicantId);
  },

  deleteApplicant(jobId, applicantId) {
    const job = this.getJobById(jobId);
    if (!job) return false;
    const idx = job.applicants.findIndex(a => a.applicantId === applicantId);
    if (idx === -1) return false;
    job.applicants.splice(idx, 1);
    return true;
  }
};

export default JobModel;
