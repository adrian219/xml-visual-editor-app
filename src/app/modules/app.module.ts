import { ValidationService } from './../services/validation/validation.service';
import { ChangeXmlStringService } from './../events/change-xml-string/change-xml-string.service';
import { ChangeXmlNodesService } from './../events/change-xml-nodes/change-xml-nodes.service';
import { TreeModule } from 'angular-tree-component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { XmlInputComponent } from './../components/editor/xml-input/xml-input.component';
import { XmlTreeComponent, EditDialog } from 'src/app/components/editor/xml-tree/xml-tree.component';
import { EditorComponent } from 'src/app/components/editor/editor.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { LoginComponent } from './../components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ImporterService } from '../services/importer/importer.service';
import { ExporterService } from '../services/exporter/exporter.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XmlPipe } from '../pipes/xml-pipe';
import { XmlSyntaxDirective } from '../directives/xml-syntax/xml-syntax.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    EditorComponent,
    XmlTreeComponent,
    XmlInputComponent,
    XmlPipe,
    XmlSyntaxDirective,
    EditDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ScrollingModule,
    DragDropModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TreeModule.forRoot(),
  ],
  providers: [
    ImporterService, 
    ExporterService, 
    ChangeXmlNodesService, 
    ChangeXmlStringService,
    ValidationService
  ],
  entryComponents: [XmlTreeComponent, EditDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}
