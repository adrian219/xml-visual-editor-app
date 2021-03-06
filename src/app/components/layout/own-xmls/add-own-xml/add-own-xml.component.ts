import { I18nService } from './../../../../utils/i18n/i18n.service';
import { ExportOwnXml } from './../../../../models/own-xml/export-own-xml.model';
import { ReloadXmlListService } from './../../../../events/reload-xml-list/reload-xml-list.service';
import { Router } from '@angular/router';
import { OwnXmlsService } from './../../../../services/own-xmls/own-xmls.service';
import { CancelAddXmlService } from './../../../../events/cancel-add-xml/cancel-add-xml.service';
import { Component, OnInit } from '@angular/core';
import { OwnXml } from 'src/app/models/own-xml/own-xml.model';
import { ToastService } from 'src/app/utils/toast/toast.service';

@Component({
  selector: 'app-add-own-xml',
  templateUrl: './add-own-xml.component.html',
  styleUrls: ['./add-own-xml.component.css']
})
export class AddOwnXmlComponent implements OnInit {

  ownXml: OwnXml = new OwnXml();

  constructor(private cancelAddXmlService: CancelAddXmlService,
    private reloadXmlListService: ReloadXmlListService,
    private ownXmlsService: OwnXmlsService,
    private toastService: ToastService,
    private router: Router,
    private i18n: I18nService) { 
  }

  ngOnInit() {
  }

  onClickCancel() {
    //set active flag on false
    this.cancelAddXmlService.changeEvent.emit(false);
  }

  onClickCreate(edit: boolean) {
    this.ownXmlsService.addXml(new ExportOwnXml(this.ownXml)).subscribe(result => {
      this.toastService.showMessage('ADD_OWN_XML.MESSAGES.CREATE', 2000);
      if(edit) {
        this.router.navigate(['/xmls/' + result.id]);
      } else {
        this.reloadXmlListService.changeEvent.emit(result);
      }
    },
    error => {
      if(error.statusText != null && error.statusText != undefined) {
        this.toastService.showError(error.statusText.concat(this.i18n.getValue('CONNECTIONS.CHECK_INTERNET')));
      }    
    });
  }
}
