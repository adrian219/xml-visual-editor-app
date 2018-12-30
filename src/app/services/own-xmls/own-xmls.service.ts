import { ExportOwnXml } from './../../models/own-xml/export-own-xml.model';
import { ToastService } from './../../utils/toast/toast.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { OwnXml } from 'src/app/models/own-xml/own-xml.model';

@Injectable({
  providedIn: 'root'
})
export class OwnXmlsService extends AbstractService {
  private serviceUrl = this.baseServiceUrl + "/own-xmls";

  constructor(private http: HttpClient,
    private toastService: ToastService) {
    super(http);
  }

  getXmls() {
    return this.http.get<OwnXml[]>(
      this.serviceUrl
    ).catch(this.errorHandling);
  }

  addXml(xml: ExportOwnXml) {
    return this.http.post<OwnXml>(
      this.serviceUrl,
      xml
    ).catch(this.errorHandling);
  }

  getXml(id: number) {
    return this.http.get<OwnXml>(
      this.serviceUrl + "/" + id,
    ).catch(this.errorHandling);
  }

  saveXml(xml: ExportOwnXml) {
    this.http.post<OwnXml>(
      this.serviceUrl + "/" + xml.id,
      xml
    )
    .catch(this.errorHandling)
    .subscribe(result => {
      this.toastService.showMessage('ZAPISANE!', 2000);
    });
  }

  saveWithDownload(xml: ExportOwnXml) {
    this.http.post<OwnXml>(
      this.serviceUrl + "/" + xml.id,
      xml
    )
    .catch(this.errorHandling)
    .subscribe(result => {
      window.open(this.baseServiceUrl + '/export/xml/' + xml.id, '_blank');
    });
  }

  deleteXml(id: number) {
    return this.http.delete<any>(
      this.serviceUrl + "/" + id,
    )
    .catch(this.errorHandling);
  }

  errorHandling(error: HttpErrorResponse) {
    return Observable.throw(error);
  }
}
