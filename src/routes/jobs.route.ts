import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { JobController } from '@/controllers/jobs.controller';
import { CreateJobDto } from '@/dtos/jobs.dto';

export class JobRoute implements Routes {
  public path = '/jobs';
  public router = Router();
  public job = new JobController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.job.getJobs);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateJobDto), this.job.createJob);

    this.router.get(`${this.path}/:id`, this.job.getJobById);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateJobDto, true), this.job.updateJob);
    this.router.delete(`${this.path}/:id`, this.job.deleteJob);
  }
}
