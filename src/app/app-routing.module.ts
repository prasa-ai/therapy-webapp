import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PracticeComponent } from './practice/practice.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'about-me', loadChildren: () => import('./about-me/about-me-routing.module').then(m => m.AboutMeModule) },
  { path: 'about-us', component: AboutMeComponent },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts-routing.module').then(m => m.ContactsModule)},
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'services', loadChildren: () => import('./services-and-resources/services-and-resources-routing.module').then(m => m.ServicesAndResourcesModule) },
  { path: 'login', component: LoginPageComponent },
  { path: 'blog', loadChildren: () => import('./blog/blog-routing.module').then(m => m.BlogModule) },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [UserGuard] },
  { path: 'practice', component: PracticeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
