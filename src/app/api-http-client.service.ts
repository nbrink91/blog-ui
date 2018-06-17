import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Contact from './contact/model/contact';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpClientService {

  private baseUrl = 'https://us-central1-portfolio-8d021.cloudfunctions.net/api';

  constructor(public httpClient: HttpClient) { }

  createContact(contact: Contact): Promise<Contact> {
    return this.httpClient.post<Contact>(`${this.baseUrl}/email`, contact).toPromise();
  }
}
