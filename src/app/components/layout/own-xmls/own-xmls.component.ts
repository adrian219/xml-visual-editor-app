import { ToastService } from './../../../utils/toast/toast.service';
import { ReloadXmlListService } from './../../../events/reload-xml-list/reload-xml-list.service';
import { CancelAddXmlService } from './../../../events/cancel-add-xml/cancel-add-xml.service';
import { OwnXmlsService } from './../../../services/own-xmls/own-xmls.service';
import { Component, OnInit } from '@angular/core';
import { OwnXml } from 'src/app/models/own-xml/own-xml.model';
import { MatTableDataSource } from '@angular/material';
import { I18nService } from 'src/app/utils/i18n/i18n.service';

@Component({
  selector: 'app-own-xmls',
  templateUrl: './own-xmls.component.html',
  styleUrls: ['./own-xmls.component.css']
})
export class OwnXmlsComponent implements OnInit {
  xmls: OwnXml[] = [];

  subscribes: any[] = [];

  newXmlActive: boolean;

  displayedColumns: string[] = ['name', 'lastUpdated', 'deleteButton'];
  dataSource = new MatTableDataSource(this.xmls);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private ownXmlsService: OwnXmlsService,
    private cancelAddXmlService: CancelAddXmlService,
    private reloadXmlListService: ReloadXmlListService,
    private toastService: ToastService,
    private i18n: I18nService) {
    this.newXmlActive = false;

    let sub = this.cancelAddXmlService.changeEvent.subscribe(result => this.newXmlActive = result);
    this.subscribes.push(sub);
    sub = this.reloadXmlListService.changeEvent.subscribe((xml) => {
      this.newXmlActive = false;
      this.reloadOneXml(xml);
    });
    this.subscribes.push(sub);
  }

  ngOnInit() {
    this.reloadXmls(); 
  }

  ngOnDestroy() {
    this.subscribes.forEach(element => {
      element.unsubscribe();
    });
  }

  reloadXmls() {
    this.ownXmlsService.getXmls().subscribe(result => {
      this.xmls = result;
      this.dataSource.data = this.xmls;
    });
  }

  reloadOneXml(ownXml: OwnXml) {
    this.xmls.unshift(ownXml);
    this.dataSource.data = this.xmls;
  }

  onAddXml() {
    this.newXmlActive = true;
  }

  onClickDeleteButton(element: OwnXml) {
    console.log(element);
    this.ownXmlsService.deleteXml(element.id).subscribe(() => {
      this.xmls.splice(this.xmls.findIndex(found => found.id == element.id), 1);
      this.dataSource.data = this.xmls; 
      this.toastService.showMessage('OWN_XMLS.MESSAGES.DELETE', 2000);
    });
  }
}
