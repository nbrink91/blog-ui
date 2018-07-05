import { Component, Input } from '@angular/core';
import { Job } from './job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {
  @Input() job: Job;
}
