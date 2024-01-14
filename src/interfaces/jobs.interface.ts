export enum JOB_STATUS {
    PENDING = 'PENDING', 
    INTERVIEW = 'INTERVIEW',
    DECLINED = 'DECLINED'
}

export enum JOB_TYPE {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    INTERNSHIP = 'internship',
};

export interface Job {
    company: string;
    position: string;
    jobStatus: string;
    jobType: string;
    jobLocation: string;
    createdBy: string;
}
  