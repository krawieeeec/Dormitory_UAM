//core modules of app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//root component
import { AppComponent } from './app.component';
//routing module
import { AppRoutingModule } from './app-routing.module';
//3rd parties extensions

//App features modules
import { MainPageModule } from './components/main-page/main-page.module';
import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { ResidentListModule } from './components/resident-list/resident-list.module';
import { AddResidentModule } from './components/add-resident/add-resident.module';
import { NavbarModule } from './layout-components/navbar/navbar.module';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'; 

//Services
import { ResidentService } from './shared/resident/resident.service';
import { CitzenshipService } from './shared/citzenship/citzenship.service';
import { DormitoryService } from './shared/dormitory.service';
import { UserSessionService } from './shared/user-session.service';
//Classes


@NgModule({
    declarations: [
      AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, 
    AddResidentModule, MainPageModule, PageNotFoundModule, NgbModule.forRoot(), ReactiveFormsModule, 
    ResidentListModule, NavbarModule, AppRoutingModule
    ],
  exports:[],
  providers: [ResidentService, DormitoryService, UserSessionService, CitzenshipService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
