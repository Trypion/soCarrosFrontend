import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ShowPageComponent } from './pages/show-page/show-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'show/:id', component: ShowPageComponent},
  { path: 'new', component: NewPageComponent, canActivate : [AuthGuardService]},
  { path: 'edit/:id', component: EditPageComponent, canActivate : [AuthGuardService]},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
