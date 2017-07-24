import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddResidentComponent }   from './components/add-resident/add-resident.component';
import { EditUserAccountComponent }  from './components/edit-user-account/edit-user-account.component';
import { SearchResidentComponent } from './components/search-resident/search-resident.component'
import { ResidentListComponent } from './components/resident-list/resident-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'addResident', component: AddResidentComponent },
  { path: 'editUserAccount', component: EditUserAccountComponent },
  { path: 'searchResident', component: SearchResidentComponent },
  { path: 'residentList/:id', component: ResidentListComponent },
  { path: 'main', component: MainPageComponent },
  
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}