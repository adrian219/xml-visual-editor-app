import { XmlNodeDTO } from './../../models/xml-node-dto';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeXmlNodesService {

  @Output() changeEvent: EventEmitter<XmlNodeDTO> = new EventEmitter();

  constructor() { }
}
