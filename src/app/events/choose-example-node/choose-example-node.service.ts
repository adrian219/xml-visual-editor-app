import { XmlNode } from 'src/app/models/xml-node';
import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChooseExampleNodeService {

  @Output() changeEvent: EventEmitter<XmlNode> = new EventEmitter();

  constructor() { }
}
