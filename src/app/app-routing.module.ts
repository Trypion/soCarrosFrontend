import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ShowPageComponent } from './show-page/show-page.component';
import { NewPageComponent } from './new-page/new-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService } from './guard/auth-guard.service';

const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'show/:id', component: ShowPageComponent},
  { path: 'new', component: NewPageComponent, canActivate : [AuthGuardService]},
  { path: 'edit/:id', component: EditPageComponent, canActivate : [AuthGuardService]},
  { path: 'login', component: LoginPageComponent},
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
