import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { PreAuthGuard } from './guards/pre-auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyTractorsComponent } from './pages/myTractors/myTractors.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'my-tractors', component: MyTractorsComponent,
    canActivate: [PreAuthGuard],
    canLoad: [PreAuthGuard]
  },
  {
    path: 'home', component: HomeComponent,
    canActivate: [PreAuthGuard],
    canLoad: [PreAuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
