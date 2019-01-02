import { ValidationRequestDTO } from 'src/app/models/validation-request-dto/validation-request-dto.model';
import { ValidationDTO } from './../../models/validation-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService extends AbstractService {
  private serviceUrl = this.baseServiceUrl + "/validation";

  constructor(private http: HttpClient) {
    super(http);
  }

  validate(dto: ValidationRequestDTO) {
    return this.http.post<ValidationDTO>(
      this.serviceUrl,
      dto
    );
  }
}
