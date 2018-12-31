import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {
  baseServiceUrl = `${environment.apiUrl}`;

  constructor(http: HttpClient) { 

  }
}
