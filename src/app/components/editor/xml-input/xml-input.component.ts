import { ValidationService } from './../../../services/validation/validation.service';
import { ChangeXmlStringService } from './../../../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../../../events/change-xml-nodes/change-xml-nodes.service';
import { ImporterService } from './../../../services/importer/importer.service';
import { Component, OnInit, Input } from '@angular/core';
import { XmlNode } from 'src/app/models/xml-node';
import { XmlNodeDTO } from 'src/app/models/xml-node-dto';

@Component({
  selector: 'app-xml-input',
  templateUrl: './xml-input.component.html',
  styleUrls: ['./xml-input.component.css']
})
export class XmlInputComponent implements OnInit {
  @Input() xml: string; 

  constructor(
    private importerService: ImporterService,
    private changeXmlNodesService: ChangeXmlNodesService,
    private changeXmlStringService: ChangeXmlStringService
  ) { }

  ngOnInit() {
    this.xml = '<pre><Parent babbba="jagaa"><children></children></Parent></pre>'; //default xml string

    this.changeXmlStringService.changeEvent.subscribe(xml => {
      this.xml = xml;
    });
  }

  onClickImportButton() {
    this.importerService.getNodes(this.xml).subscribe(result => {
      this.changeXmlNodesService.changeEvent.emit(this.getXmlNode(result.node));
    });
  }

  onKey($event) {
    event.preventDefault(); //disabled tab key
  }

  private getXmlNode(importNode: XmlNodeDTO): XmlNode {
    let children: XmlNode[] = [];
    importNode.children.forEach(node => {
      children.push(this.getXmlNode(node))
    });

    return new XmlNode(importNode.id, importNode.name, importNode.paramKeys, importNode.paramValues, children, importNode.content);
  }

  getErrorMessage() {
    return 'Znaleziono blad skladniowy!';
  }
}
