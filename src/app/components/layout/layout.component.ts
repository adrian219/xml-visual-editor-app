import { ChooseExampleNodeService } from './../../events/choose-example-node/choose-example-node.service';
import { XmlNode } from 'src/app/models/xml-node';
import { ExampleNodes } from './../../models/example-nodes';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  title = "XmlVisualEditor"

  exampleNodes = ExampleNodes.exampleNodes;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private chooseExampleNodeService: ChooseExampleNodeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {

  }

  onChoose(node: XmlNode) {
    this.chooseExampleNodeService.changeEvent.emit(node);
  }
}
