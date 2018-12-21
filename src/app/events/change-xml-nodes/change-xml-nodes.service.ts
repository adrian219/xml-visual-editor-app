import { Injectable, Output, EventEmitter } from '@angular/core';
import { XmlNode } from 'src/app/models/xml-node';

@Injectable({
  providedIn: 'root'
})
export class ChangeXmlNodesService {

  @Output() changeEvent: EventEmitter<XmlNode> = new EventEmitter();

  constructor() { }
}
