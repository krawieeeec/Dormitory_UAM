import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddResidentComponent }   from './add-resident/add-resident.component';
import { DormitoryListComponent }      from './dormitory-list/dormitory-list.component';
import { EditUserAccountComponent }  from './edit-user-account/edit-user-account.component';
import { SearchResidentComponent } from './search-resident/search-resident.component'
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'addResident', component: AddResidentComponent },
  { path: 'dormitoryList', component: DormitoryListComponent },
  { path: 'editUserAccount', component: EditUserAccountComponent },
  { path: 'searchResident', component: SearchResidentComponent },
  { path: 'main', component: MainPageComponent },
  
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}