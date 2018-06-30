import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Contact from './model/contact';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactHttpClientService } from './contact-http-client.service';
import { ReCaptcha } from '../recaptcha/ReCaptcha';
import { environment } from '../../environments/environment.prod';

declare const grecaptcha: ReCaptcha;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact;

  contactForm: FormGroup;

  submitting = false;

  spinnerSize: number;

  constructor(private httpClient: ContactHttpClientService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.contact = new Contact();
    this.contactForm = new FormGroup({
      'name': new FormControl(this.contact.name, Validators.required),
      'email': new FormControl(this.contact.email, [Validators.required, Validators.email]),
      'message': new FormControl(this.contact.message, Validators.required),
    });
  }

  async onSubmit(event: any) {
    this.spinnerSize = event.target.clientHeight;
    this.submitting = true;

    const token = await grecaptcha.execute(environment.recaptcha.siteKey, { action: 'contactForm' });
    const status = await this.httpClient.validateReCaptcha(token);
    if (status.success === true && status.score > 0.5) {
      await this.httpClient.createContact(this.contactForm.value);
      this.contactForm.reset();
      this.snackBar.open('Message sent successfully!', undefined, {duration: 3000});
    } else {
      this.snackBar.open('Failed to validate submission was not a bot!', undefined, {duration: 10000});
    }
    this.submitting = false;
  }
}
