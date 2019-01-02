import { I18nService } from './../../../utils/i18n/i18n.service';
import { ActivatedRoute } from '@angular/router';
import { OwnXmlsService } from './../../../services/own-xmls/own-xmls.service';
import { SaveXmlService } from './../../../events/save-xml/save-xml.service';
import { LoadXmlService } from './../../../events/load-xml/load-xml.service';
import { ToastService } from './../../../utils/toast/toast.service';
import { ChangeXmlStringService } from './../../../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../../../events/change-xml-nodes/change-xml-nodes.service';
import { ImporterService } from './../../../services/importer/importer.service';
import { Component, OnInit, Input } from '@angular/core';
import { ExportOwnXml } from 'src/app/models/own-xml/export-own-xml.model';

@Component({
  selector: 'app-xml-input',
  templateUrl: './xml-input.component.html',
  styleUrls: ['./xml-input.component.css']
})
export class XmlInputComponent implements OnInit {
  @Input() xml: string; 

  subscribes: any[] = [];

  selectedFile: File = null;

  constructor(
    private importerService: ImporterService,
    private changeXmlNodesService: ChangeXmlNodesService,
    private changeXmlStringService: ChangeXmlStringService,
    private toastService: ToastService,
    private loadXmlService: LoadXmlService,
    private saveXmlService: SaveXmlService,
    private ownXmlsService: OwnXmlsService,
    private route: ActivatedRoute,
    private i18nService: I18nService
  ) { 
    this.changeXmlStringService.changeEvent.subscribe(data => {
      this.xml = data;
    },
    error => {
      if(error.statusText != null && error.statusText != undefined) {
        this.toastService.showError(error.statusText);
      }
    }
    );

    let sub = this.loadXmlService.event.subscribe(ownXml => {
      this.xml = ownXml.xml;
      this.onClickImportButton();
    });

    this.subscribes.push(sub);

    sub = this.saveXmlService.event.subscribe(ownXml => {
      ownXml.xml = this.xml;
      this.ownXmlsService.saveXml(new ExportOwnXml(ownXml));
    });

    this.subscribes.push(sub);

    sub = this.saveXmlService.eventWithDownload.subscribe(ownXml => {
      ownXml.xml = this.xml;
      this.ownXmlsService.saveWithDownload(new ExportOwnXml(ownXml));
    });

    this.subscribes.push(sub);
  }

  ngOnInit() {
    this.xml = '';
  }

  ngOnDestroy() {
    this.subscribes.forEach(element => {
      element.unsubscribe();
    });
  }

  onClickImportButton() {
    if(this.xml != null && this.xml != undefined && this.xml.length != 0) {
      this.importerService.getNodes({xml: this.xml}).subscribe(data => {
        this.changeXmlNodesService.changeEvent.emit(data.node);
      },
      error => {
        if(error.statusText != null && error.statusText != undefined) {
          this.toastService.showError(error.statusText);
        }
      });
    } else {
      this.changeXmlNodesService.changeEvent.emit(null);
    }
  }

  /* Upload files */
  previewImage(event) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.importerService.importFile(+this.route.snapshot.paramMap.get('id'), fd).subscribe((result) => {
      this.xml = result.xml;
      this.changeXmlNodesService.changeEvent.emit(result.node);
    });
  }

  onKey($event) {
    event.preventDefault(); //disabled tab key
  }
}
