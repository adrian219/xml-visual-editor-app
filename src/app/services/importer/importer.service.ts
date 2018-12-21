import { AbstractService } from './../abstract.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImportDTO } from 'src/app/models/import.model';

@Injectable({
  providedIn: 'root'
})
export class ImporterService extends AbstractService {
  private serviceUrl = this.baseServiceUrl + "/import";

  constructor(private http: HttpClient) { 
    super(http);
  }

  getNodes(xml: string) {
    return this.http.post<ImportDTO>(
      this.serviceUrl,
      xml
    );
  }
}
