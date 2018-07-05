export interface JobPeriod {
    year: number;
    month: string;
}

export interface Job {
    employer: string;
    title: string;
    roles: string[];
    start: JobPeriod;
    end?: JobPeriod;
}
