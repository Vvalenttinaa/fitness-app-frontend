import { Routes } from '@angular/router';
import { DetailsComponent } from './features/fitness-program/pages/details/details.component';
import { guestGuard } from './guards/guest.guard';
import { RegistrationComponent } from './authentication/pages/registration/registration.component';
import { LoginComponent } from './authentication/pages/login/login.component';
import { PageProgramsComponent } from './features/fitness-program/pages/page-programs/page-programs.component';
import { NewsComponent } from './features/start-page/pages/news/news.component';

export const routes: Routes = [
{
    path: '',
    component: NewsComponent,
    title: 'News',
    canActivate:[guestGuard]
  },
  {
    path: 'programs',
    component: PageProgramsComponent,
    title: 'Programs',
    canActivate:[guestGuard]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Program details',
    canActivate:[guestGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration',
    canActivate:[guestGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title:'Login',
     canActivate:[guestGuard]
  }
];
