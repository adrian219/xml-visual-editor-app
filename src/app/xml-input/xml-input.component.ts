import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-xml-input',
  templateUrl: './xml-input.component.html',
  styleUrls: ['./xml-input.component.css']
})
export class XmlInputComponent implements OnInit {
  @Input() xml : string;
  
  constructor() { }

  ngOnInit() {
    this.xml = '<Parent><children></children></Parent>';
  }

}
