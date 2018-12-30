import { CheckTakenResponse } from './../../models/check-taken/check-taken-response';
import { CheckTaken } from './../../models/check-taken/check-taken.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTakenService extends AbstractService {
  private serviceUrl = this.baseServiceUrl + "/check-taken";

  constructor(private http: HttpClient) {
    super(http);
  }

  checkUsername(dto: CheckTaken) {
    return this.http.post<CheckTakenResponse>(
      this.serviceUrl + "/username",
      dto
    );
  }

  checkEmail(dto: CheckTaken) {
    return this.http.post<CheckTakenResponse>(
      this.serviceUrl + "/email",
      dto
    );
  }
}
