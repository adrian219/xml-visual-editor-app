import { I18nService } from 'src/app/utils/i18n/i18n.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { ChooseExampleNodeService } from './../../events/choose-example-node/choose-example-node.service';
import { XmlNode } from 'src/app/models/xml-node';
import { ExampleNodes } from './../../models/example-nodes';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  router: string;

  exampleNodes = ExampleNodes.exampleNodes;

  mobileQuery: MediaQueryList;

  firstname = JSON.parse(localStorage.getItem('currentUser')).firstname;
  lastname = JSON.parse(localStorage.getItem('currentUser')).lastname;

  private _mobileQueryListener: () => void;

  @ViewChild(MatSidenav) snav: MatSidenav;

  now = new Date();

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private chooseExampleNodeService: ChooseExampleNodeService,
    private authenticationService: AuthenticationService,
    private _router: Router,
    private i18n: I18nService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.router = _router.url;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  onChoose(node: XmlNode) {
    this.chooseExampleNodeService.changeEvent.emit(node);
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
