import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Contact from './contact';
import { RecaptchaValidation } from './recaptcha-validation';

@Injectable({
  providedIn: 'root'
})
export class ContactHttpClientService {
  private baseUrl = 'https://us-central1-portfolio-8d021.cloudfunctions.net/api';

  constructor(public httpClient: HttpClient) { }

  createContact(contact: Contact): Promise<Contact> {
    return this.httpClient.post<Contact>(`${this.baseUrl}/email`, contact).toPromise();
  }

  validateReCaptcha(token: string): Promise<RecaptchaValidation> {
    return this.httpClient.get<RecaptchaValidation>(`${this.baseUrl}/verify`, {params: { token }}).toPromise();
  }
}
