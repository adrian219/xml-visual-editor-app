import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CancelAddXmlService {

  @Output() changeEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
