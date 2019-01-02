import { Observable } from 'rxjs';
import { AbstractService } from './../abstract.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ImportDTO } from 'src/app/models/import.model';
import { ImportFileDTO } from 'src/app/models/import-file-dto.model.ts/import-file-dto.model';
import { ImportRequestDTO } from 'src/app/models/import-request-dto/import-request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ImporterService extends AbstractService {
  private serviceUrl = this.baseServiceUrl + "/import";

  constructor(private http: HttpClient) {
    super(http);
  }

  getNodes(dto: ImportRequestDTO) {
    return this.http.post<ImportDTO>(
      this.serviceUrl,
      dto
    ).catch(this.errorHandling);
  }

  importFile(id: number, fd: FormData) {
    return this.http.post<ImportFileDTO>(
      this.serviceUrl + '/xml/' + id,
      fd
    ).catch(this.errorHandling);
  }

  errorHandling(error: HttpErrorResponse) {
    return Observable.throw(error);
  }
}
