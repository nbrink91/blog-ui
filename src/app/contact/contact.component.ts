import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';

import Contact from './model/contact';
import { ApiHttpClientService } from '../api-http-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact;

  contactForm: FormGroup;

  submitting = false;

  constructor(public httpClient: ApiHttpClientService, public snackBar: MatSnackBar) { }

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

  async onSubmit() {
    this.submitting = true;
    await this.httpClient.createContact(this.contactForm.value);
    this.createForm();
    this.submitting = false;
    this.snackBar.open('Message sent successfully!', undefined, {duration: 3000});
  }
}
