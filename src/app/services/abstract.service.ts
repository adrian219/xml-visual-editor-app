import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {
  baseServiceUrl = "http://127.0.0.1:8380/xml-visual-editor-service";

  constructor(http: HttpClient) { 

  }
}
