import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { JobService } from '@/services/jobs.service';
import { Job } from '@/interfaces/jobs.interface';

export class JobController {
  public job = Container.get(JobService);

  public getJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllJobsData: Job[] = await this.job.findAllJobs();

      res.status(200).json({ data: findAllJobsData, message: 'Jobs fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId: string = req.params.id;
      const findOneJobData: Job = await this.job.findJobById(jobId);

      res.status(200).json({ data: findOneJobData, message: 'Job fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobData: Job = req.body;
      const createJobData: Job = await this.job.createJob(jobData);

      res.status(201).json({ data: createJobData, message: 'Job created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId: string = req.params.id;
      const jobData: Job = req.body;
      const updateJobData: Job = await this.job.updateJob(jobId, jobData);

      res.status(200).json({ data: updateJobData, message: 'Job updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId: string = req.params.id;
      const deleteJobData: Job = await this.job.deleteJob(jobId);

      res.status(200).json({ data: deleteJobData, message: 'Job deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
