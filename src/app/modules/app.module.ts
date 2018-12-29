import { CancelAddXmlService } from './../events/cancel-add-xml/cancel-add-xml.service';
import { AddOwnXmlComponent } from './../components/layout/own-xmls/add-own-xml/add-own-xml.component';
import { OwnXmlsComponent } from './../components/layout/own-xmls/own-xmls.component';
import { AuthGuard } from './../guards/auth.guard';
import { ErrorInterceptor } from './../helpers/error.interceptor';
import { JwtInterceptor } from './../helpers/jwt.interceptor';
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
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImporterService } from '../services/importer/importer.service';
import { ExporterService } from '../services/exporter/exporter.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from '../components/app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XmlPipe } from '../pipes/xml-pipe';
import { XmlSyntaxDirective } from '../directives/xml-syntax/xml-syntax.directive';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserService } from '../services/user/user.service';
import { fakeBackendProvider } from '../helpers/fake-backend';
import { RegisterComponent } from '../components/register/register.component';
import { OwnXmlsService } from '../services/own-xmls/own-xmls.service';
import { ReloadXmlListService } from '../events/reload-xml-list/reload-xml-list.service';
import { SaveXmlService } from '../events/save-xml/save-xml.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    EditorComponent,
    XmlTreeComponent,
    XmlInputComponent,
    XmlPipe,
    XmlSyntaxDirective,
    EditDialog,
    OwnXmlsComponent,
    AddOwnXmlComponent
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
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

  ],
  providers: [
    ImporterService, 
    ExporterService, 
    ChangeXmlNodesService, 
    ChangeXmlStringService,
    ValidationService,
    AuthGuard,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    OwnXmlsService,
    CancelAddXmlService,
    ReloadXmlListService,
    SaveXmlService
  ],
  entryComponents: [XmlTreeComponent, EditDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
