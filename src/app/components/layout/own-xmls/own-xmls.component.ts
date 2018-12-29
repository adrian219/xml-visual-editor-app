import { ToastService } from './../../../utils/toast/toast.service';
import { ReloadXmlListService } from './../../../events/reload-xml-list/reload-xml-list.service';
import { CancelAddXmlService } from './../../../events/cancel-add-xml/cancel-add-xml.service';
import { OwnXmlsService } from './../../../services/own-xmls/own-xmls.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OwnXml } from 'src/app/models/own-xml/own-xml.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-own-xmls',
  templateUrl: './own-xmls.component.html',
  styleUrls: ['./own-xmls.component.css']
})
export class OwnXmlsComponent implements OnInit {
  xmls: OwnXml[] = [];

  newXmlActive: boolean;

  displayedColumns: string[] = ['name', 'lastUpdated', 'deleteButton'];
  dataSource = new MatTableDataSource(this.xmls);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private ownXmlsService: OwnXmlsService,
    private cancelAddXmlService: CancelAddXmlService,
    private reloadXmlListService: ReloadXmlListService,
    private toastService: ToastService) {
    this.newXmlActive = false;
  }

  ngOnInit() {
    this.reloadXmls(); 
    this.cancelAddXmlService.changeEvent.subscribe(result => this.newXmlActive = result);
    this.reloadXmlListService.changeEvent.subscribe((xml) => {
      this.newXmlActive = false;
      this.reloadOneXml(xml);
    });
  }

  reloadXmls() {
    this.ownXmlsService.getXmls().subscribe(result => {
      this.xmls = result;
      this.dataSource.data = this.xmls;
    });
  }

  reloadOneXml(ownXml: OwnXml) {
    this.xmls.push(ownXml);
    this.dataSource.data = this.xmls;
  }

  onAddXml() {
    this.newXmlActive = true;
  }

  onClickDeleteButton(element: OwnXml) {
    console.log(element);
    this.ownXmlsService.deleteXml(element.id).subscribe(() => {
      this.xmls.splice(this.xmls.findIndex(found => found.id == element.id))
      this.dataSource.data = this.xmls; 
      this.toastService.showMessage('Xml zostal usuniety!', 2000);
    });
  }
}
