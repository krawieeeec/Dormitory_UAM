import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddGuestComponent }   from './add-guest/add-guest.component';
import { DormitoryListComponent }      from './dormitory-list/dormitory-list.component';
import { EditUserAccountComponent }  from './edit-user-account/edit-user-account.component';
import { SearchGuestComponent } from './search-guest/search-guest.component'
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'addGuest', component: AddGuestComponent },
  { path: 'dormitoryList', component: DormitoryListComponent },
  { path: 'editUserAccount', component: EditUserAccountComponent },
  { path: 'searchGuest', component: SearchGuestComponent },
  { path: 'main', component: MainPageComponent },
  
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}