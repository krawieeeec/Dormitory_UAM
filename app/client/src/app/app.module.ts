//core modules of app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//root component
import { AppComponent } from './app.component';
//routing module
import { AppRoutingModule } from './app-routing.module';

//App features modules
import { AddResidentModule } from './components/add-resident/add-resident.module';
import { EditUserAccountModule } from './components/edit-user-account/edit-user-account.module';
import { MainPageModule } from './components/main-page/main-page.module';
import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { SearchResidentModule } from './components/search-resident/search-resident.module';
import { ResidentListModule } from './components/resident-list/resident-list.module';
import { NavbarModule } from './layout-components/navbar/navbar.module';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'; 

//Services
import { ResidentService } from './shared/resident.service';
import { DormitoryService } from './shared/dormitory.service';
import { UserSessionService } from './shared/user-session.service';
//Classes


@NgModule({
    declarations: [
      AppComponent
  ],
  imports: [
    BrowserModule, HttpModule,
    AddResidentModule, EditUserAccountModule,
    MainPageModule, PageNotFoundModule, SearchResidentModule, NgbModule.forRoot(), ReactiveFormsModule, 
    ResidentListModule, NavbarModule, AppRoutingModule
    ],
  exports:[],
  providers: [ResidentService, DormitoryService, UserSessionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
