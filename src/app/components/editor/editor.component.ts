import { I18nService } from './../../utils/i18n/i18n.service';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { SaveXmlService } from './../../events/save-xml/save-xml.service';
import { LoadXmlService } from './../../events/load-xml/load-xml.service';
import { OwnXml } from 'src/app/models/own-xml/own-xml.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OwnXmlsService } from 'src/app/services/own-xmls/own-xmls.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  ownXml: OwnXml = new OwnXml();

  constructor(private route: ActivatedRoute,
    private ownXmlsService: OwnXmlsService,
    private loadXmlService: LoadXmlService,
    private saveXmlService: SaveXmlService,
    private exporterService: ExporterService,
    private i18n: I18nService) { 
    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.ownXmlsService.getXml(id).subscribe(xml => {
      this.ownXml = xml;
      this.loadXmlService.event.emit(xml);
    })
  }

  onClickSaveButton() {
    this.saveXmlService.event.emit(this.ownXml);
  }

  onClickExportButton() {
    this.saveXmlService.eventWithDownload.emit(this.ownXml);
  }
}
