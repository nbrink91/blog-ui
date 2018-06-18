import { TestBed, inject } from '@angular/core/testing';

import { ContactHttpClientService } from './contact-http-client.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ContactHttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        ContactHttpClientService
      ]
    });
  });

  it('should be created', inject([ContactHttpClientService], (service: ContactHttpClientService) => {
    expect(service).toBeTruthy();
  }));
});
