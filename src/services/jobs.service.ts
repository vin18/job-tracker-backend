import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { JobModel } from '@/models/jobs.model';
import { Job } from '@/interfaces/jobs.interface';

@Service()
export class JobService {
  public async findAllJobs(): Promise<Job[]> {
    const jobs: Job[] = await JobModel.find();
    return jobs;
  }

  public async findJobById(jobId: string): Promise<Job> {
    const findJob: Job = await JobModel.findOne({ _id: jobId });
    if (!findJob) throw new HttpException(409, "Job doesn't exist");

    return findJob;
  }

  public async createJob(jobData: Job): Promise<Job> {
    const findJob: Job = await JobModel.findOne({ company: jobData.company, position: jobData.position });
    if (findJob) throw new HttpException(409, `Job with ${jobData.company} and ${jobData.position} already exists`);

    const createJobData: Job = await JobModel.create({ ...jobData });
    return createJobData;
  }

  public async updateJob(jobId: string, jobData: Job): Promise<Job> {
    if (jobData.company) {
      const findJob: Job = await JobModel.findOne({ company: jobData.company, position: jobData.position });
      if (findJob) throw new HttpException(409, `Job with ${jobData.company} and ${jobData.position} already exists`);
    }

    const updateJobById: Job = await JobModel.findByIdAndUpdate(jobId, { jobData });
    if (!updateJobById) throw new HttpException(409, "Job doesn't exist");

    return updateJobById;
  }

  public async deleteJob(jobId: string): Promise<Job> {
    const deleteJobById: Job = await JobModel.findByIdAndDelete(jobId);
    if (!deleteJobById) throw new HttpException(409, "Job doesn't exist");

    return deleteJobById;
  }
}
