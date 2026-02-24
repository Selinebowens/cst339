import { Routes } from '@angular/router';
import { PrayerListComponent } from './components/prayer-list/prayer-list';
import { PrayerFormComponent } from './components/prayer-form/prayer-form';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'prayers', component: PrayerListComponent },
  { path: 'prayers/new', component: PrayerFormComponent },
  { path: 'prayers/edit/:id', component: PrayerFormComponent },
  { path: 'answered', component: PrayerListComponent }
];