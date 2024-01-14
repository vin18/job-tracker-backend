import { model, Schema, Document, Types } from 'mongoose';
import { JOB_STATUS, JOB_TYPE, Job } from '@/interfaces/jobs.interface';

const JobSchema: Schema = new Schema(
    {
        company: {
            type: String,
            required: true,
            unique: true,
        },
        position: {
            type: String,
            required: true,
        },
        jobStatus: {
            type: String,
            enum: Object.values(JOB_STATUS),
            default: JOB_STATUS.PENDING
        },
        jobType: {
            type: String,
            enum: Object.values(JOB_TYPE),
            default: JOB_TYPE.FULL_TIME
        },
        jobLocation: {
            type: String,
            default: 'my-city'
        },
        createdBy: {
            type: Types.ObjectId,
            ref: 'User'
        },
    }, 
    { timestamps: true }
);

export const JobModel = model<Job & Document>('Job', JobSchema);
