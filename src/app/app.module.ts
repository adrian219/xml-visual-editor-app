import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TreeModule } from 'angular-tree-component';
import { XmlTreeComponent } from './xml-tree/xml-tree.component';
import { XmlInputComponent } from './xml-input/xml-input.component';

@NgModule({
  declarations: [
    AppComponent,
    XmlTreeComponent,
    XmlInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    DragDropModule,
    TreeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
