import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResidentAddComponent }   from './components/resident-list/resident-add/resident-add.component';
import { ResidentListComponent } from './components/resident-list/resident-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResidentEditComponent } from './components/resident-list/resident-edit/resident-edit.component';
import { ResidentBlockComponent } from './components/resident-list/resident-block/resident-block.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'residentList/:id', component: ResidentListComponent,
    children: [
      { path: 'residentEdit/:id', component: ResidentEditComponent },
      { path: 'residentBlock/:id', component: ResidentBlockComponent },
      { path: 'residentAdd', component: ResidentAddComponent },
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