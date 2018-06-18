import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';

import Contact from './model/contact';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactHttpClientService } from './contact-http-client.service';

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
    console.log(event.target.clientHeight);
    this.spinnerSize = event.target.clientHeight;
    this.submitting = true;
    await this.httpClient.createContact(this.contactForm.value);
    this.contactForm.reset();
    this.submitting = false;
    this.snackBar.open('Message sent successfully!', undefined, {duration: 3000});
  }
}
