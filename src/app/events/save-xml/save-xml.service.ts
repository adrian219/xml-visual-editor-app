import { Injectable, Output, EventEmitter } from '@angular/core';
import { OwnXml } from 'src/app/models/own-xml/own-xml.model';

@Injectable({
  providedIn: 'root'
})
export class SaveXmlService {

  @Output() event: EventEmitter<OwnXml> = new EventEmitter();
  @Output() eventWithDownload: EventEmitter<OwnXml> = new EventEmitter();

  constructor() { }
}
