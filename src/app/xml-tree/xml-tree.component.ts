import { XmlNode } from './xml-node';
import { Component, OnInit, Input } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-xml-tree',
  templateUrl: './xml-tree.component.html',
  styleUrls: ['./xml-tree.component.css']
})
export class XmlTreeComponent implements OnInit {

  @Input() nodes = [
      new XmlNode(1, "Baatrarar", null, [new XmlNode(3, "SubNode")]),
      new XmlNode(2, "Baatrarardddd", new Map<string, string>().set("key", "value").set("key2", "value2"), null),
      new XmlNode(5, "Baatrararaaaaaa"),
      new XmlNode(6, "Baatrarar3333")
  ];

  options: ITreeOptions = {
    allowDrag: (node) => true,
    displayField: "displayField"
  };

  constructor() { }

  ngOnInit() {
  }

  export() {
    let xmlNode = new XmlNode(10, "Root", null, this.nodes);

    console.log(xmlNode.export());
  }

}
