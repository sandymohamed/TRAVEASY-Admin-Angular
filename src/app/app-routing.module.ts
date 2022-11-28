import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbidenComponent } from './components/forbiden/forbiden.component';
import { ModeratorGuard } from './helpers/moderator.guard';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookedHolidaysComponent } from './components/booked-holidays/booked-holidays.component';
import { BookedHotelsComponent } from './components/booked-hotels/booked-hotels.component';
import { CityComponent } from './components/city/city.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlightsComponent } from './components/flights/flights.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LogginComponent } from './components/loggin/loggin.component';
import { RegisterComponent } from './components/register/register.component';
import { TourguidComponent } from './components/tourguid/tourguid.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './helpers/admin.guard';

const routes: Routes = [
  { path: '', component: LogginComponent },
  { path: 'login', component: LogginComponent },

  // admin
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  { path: 'hotel', component: HotelsComponent, canActivate: [ModeratorGuard] },
  // admin
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  // admin
  {
    path: 'flight',
    component: FlightsComponent,
    canActivate: [AdminGuard],
  },
  { path: 'register', component: RegisterComponent, canActivate: [AdminGuard] },

  // moderator || admin
  {
    path: 'holiday',
    component: HolidayComponent,
    canActivate: [ModeratorGuard],
  },
  // admin || moderator
  {
    path: 'tourguid',
    component: TourguidComponent,
    canActivate: [ModeratorGuard],
  },
  // admin || moderator
  {
    path: 'bookedHotel',
    component: BookedHotelsComponent,
    canActivate: [ModeratorGuard],
  },
  // admin || moderator
  {
    path: 'bookedHoliday',
    component: BookedHolidaysComponent,
    canActivate: [ModeratorGuard],
  },
  // admin
  { path: 'city', component: CityComponent, canActivate: [AdminGuard] },
  {
    path: 'upload',
    component: ImageUploadComponent,
    canActivate: [ModeratorGuard],
  },
  {
    path: 'forbiden',
    component: ForbidenComponent,
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
