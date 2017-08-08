import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddResidentComponent }   from './components/add-resident/add-resident.component';
import { EditUserAccountComponent }  from './components/edit-user-account/edit-user-account.component';
import { SearchResidentComponent } from './components/search-resident/search-resident.component'
import { ResidentListComponent } from './components/resident-list/resident-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResidentEditComponent } from './components/resident-list/resident-edit/resident-edit.component';
import { ResidentPersonalDataComponent } from './components/resident-list/resident-edit/resident-personal-data/resident-personal-data.component';
import { ResidentDormitoryComponent } from './components/resident-list/resident-edit/resident-dormitory/resident-dormitory.component';
import { ResidentDocumentComponent } from './components/resident-list/resident-edit/resident-document/resident-document.component';
import { ResidentAddressComponent } from './components/resident-list/resident-edit/resident-address/resident-address.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'addResident', component: AddResidentComponent },
  { path: 'editUserAccount', component: EditUserAccountComponent },
  { path: 'searchResident', component: SearchResidentComponent },
  { path: 'residentList/:id', component: ResidentListComponent,
    children: [
      { path: 'residentEdit/:id', component: ResidentEditComponent,
         children: [
         { path: 'personalData', component: ResidentPersonalDataComponent },
         { path: 'dormitory', component: ResidentDormitoryComponent },
         { path: 'document', component: ResidentDocumentComponent },
         { path: 'address', component: ResidentAddressComponent },
         { path: '', redirectTo: 'personalData', pathMatch: 'full' },
      ]
  },
    ]
  },
  { path: 'main', component: MainPageComponent },
  
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}