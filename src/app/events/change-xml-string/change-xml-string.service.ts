import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeXmlStringService {

  @Output() changeEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  change(xml: string) {
    this.changeEvent.emit(xml);
  }
}
