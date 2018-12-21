import { ChangeXmlStringService } from './../../../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../../../events/change-xml-nodes/change-xml-nodes.service';
import { XmlNode } from '../../../models/xml-node';
import { Component, OnInit, Input } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { ImporterService } from 'src/app/services/importer/importer.service';

@Component({
  selector: 'app-xml-tree',
  templateUrl: './xml-tree.component.html',
  styleUrls: ['./xml-tree.component.css']
})
export class XmlTreeComponent implements OnInit {

  @Input() nodes = [
    new XmlNode(1, "Baatrarar", null, null, [new XmlNode(3, "SubNode", null)]),
    new XmlNode(2, "Baatrarardddd", null, null, null),
    new XmlNode(5, "Baatrararaaaaaa", null),
    new XmlNode(6, "Baatrarar3333", null)
  ];

  options: ITreeOptions = {
    allowDrag: (node) => true,
    displayField: "displayField"
  };

  constructor(
    private exportService: ExporterService,
    private importService: ImporterService,
    private changeXmlNodesService: ChangeXmlNodesService,
    private changeXmlStringService: ChangeXmlStringService
  ) { }

  ngOnInit() {
    this.changeXmlNodesService.changeEvent.subscribe((node: XmlNode) => {
      this.nodes.splice(0, this.nodes.length);
      this.nodes = [node];
    });
  }

  export() {
  }

  onMoveNode($event) {
    this.exportService.getXml(this.nodes[0]).subscribe(result => {
      this.changeXmlStringService.changeEvent.emit(result.xml);
    });
  }
}