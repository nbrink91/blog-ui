import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Contact from './model/contact';
import { ReCaptchaValidation } from './model/ReCaptchaValidation';

@Injectable({
  providedIn: 'root'
})
export class ContactHttpClientService {
  private baseUrl = 'https://us-central1-portfolio-8d021.cloudfunctions.net/api';

  constructor(public httpClient: HttpClient) { }

  createContact(contact: Contact): Promise<Contact> {
    return this.httpClient.post<Contact>(`${this.baseUrl}/email`, contact).toPromise();
  }

  validateReCaptcha(token: string): Promise<ReCaptchaValidation> {
    return this.httpClient.get<ReCaptchaValidation>(`${this.baseUrl}/verify`, {params: { token }}).toPromise();
  }
}
