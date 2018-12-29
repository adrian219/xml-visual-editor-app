import { OwnXmlsService } from './../../../services/own-xmls/own-xmls.service';
import { SaveXmlService } from './../../../events/save-xml/save-xml.service';
import { LoadXmlService } from './../../../events/load-xml/load-xml.service';
import { ToastService } from './../../../utils/toast/toast.service';
import { ChangeXmlStringService } from './../../../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../../../events/change-xml-nodes/change-xml-nodes.service';
import { ImporterService } from './../../../services/importer/importer.service';
import { Component, OnInit, Input } from '@angular/core';
import { OwnXml } from 'src/app/models/own-xml/own-xml.model';
import { ExportOwnXml } from 'src/app/models/own-xml/export-own-xml.model';

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
    private changeXmlStringService: ChangeXmlStringService,
    private toastService: ToastService,
    private loadXmlService: LoadXmlService,
    private saveXmlService: SaveXmlService,
    private ownXmlsService: OwnXmlsService
  ) { }

  ngOnInit() {
    this.xml = '<pre><Parent babbba="jagaa"><children></children></Parent></pre>'; //default xml string

    this.changeXmlStringService.changeEvent.subscribe(data => {
      this.xml = data;
    },
    error => {
      if(error.statusText != null && error.statusText != undefined) {
        this.toastService.showError(error.statusText.concat(". Check your Internet connection"));
      }
    }
    );

    this.loadXmlService.event.subscribe(ownXml => {
      this.xml = ownXml.xml;
      this.onClickImportButton();
    });

    this.saveXmlService.event.subscribe(ownXml => {
      ownXml.xml = this.xml;
      this.ownXmlsService.saveXml(new ExportOwnXml(ownXml));
    });
  }

  onClickImportButton() {
    this.importerService.getNodes(this.xml).subscribe(data => {
      this.changeXmlNodesService.changeEvent.emit(data.node);
    },
    error => {
      if(error.statusText != null && error.statusText != undefined) {
        this.toastService.showError(error.statusText.concat(". Check your Internet connection"));
      }
    });
  }

  onKey($event) {
    event.preventDefault(); //disabled tab key
  }

  getErrorMessage() {
    return 'Znaleziono blad skladniowy!';
  }
}
