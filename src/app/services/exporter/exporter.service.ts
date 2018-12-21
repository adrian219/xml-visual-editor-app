import { HttpClient } from '@angular/common/http';
import { AbstractService } from './../abstract.service';
import { Injectable } from '@angular/core';
import { ExportDTO } from 'src/app/models/export.model';
import { XmlNode } from 'src/app/models/xml-node';

@Injectable({
  providedIn: 'root'
})
export class ExporterService extends AbstractService {
  private serviceUrl = this.baseServiceUrl + "/export";

  constructor(private http: HttpClient) { 
    super(http);
  }

  getXml(xmlNode: XmlNode) {
    return this.http.post<ExportDTO>(
      this.serviceUrl,
      xmlNode
    );
  }
}
