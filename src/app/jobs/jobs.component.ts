import { Component, OnInit } from '@angular/core';
import { Job } from '../job/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  private jobs: Job[];

  constructor() { }

  ngOnInit() {
    this.jobs = [
      {
        employer: 'Mattersight',
        title: 'Software Engineer',
        roles: ['Back-End Developer', 'Architect'],
        start: {
          year: 2018,
          month: 'April',
        }
      },
      {
        employer: 'Mattersight',
        title: 'Senior Software Developer',
        roles: ['Back-End Developer', 'Software Maintenance'],
        start: {
          year: 2017,
          month: 'June',
        },
        end: {
          year: 2018,
          month: 'March',
        }
      },
      {
        employer: 'Seton Hill University',
        title: 'Programmer/Analyst',
        roles: ['Web Developer', 'Back-End Developer', 'DBA'],
        start: {
          year: 2015,
          month: 'May',
        },
        end: {
          year: 2017,
          month: 'May',
        }
      },
      {
        employer: 'Seton Hill University',
        title: 'Solution Center Tech',
        roles: ['First Line Support'],
        start: {
          year: 2014,
          month: 'July',
        }
      },
    ];
  }
}
