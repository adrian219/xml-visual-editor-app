import { UnauthorizedComponent } from './../components/error/unauthorized/unauthorized.component';
import { AccessDeniedComponent } from './../components/error/access-denied/access-denied.component';
import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { EditorComponent } from '../components/editor/editor.component';
import { OwnXmlsComponent } from '../components/layout/own-xmls/own-xmls.component';

const routes: Routes = [
  { path: '', redirectTo: 'xmls', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'xmls', component: OwnXmlsComponent },
      { path: 'xmls/:id', component: EditorComponent }, 
    ]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }