import { Observable } from 'rxjs';
import { AbstractService } from './../abstract.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
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
    ).catch(this.errorHandling);
  }

  errorHandling(error: HttpErrorResponse) {
    return Observable.throw(error);
  }
}
