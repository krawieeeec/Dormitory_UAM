//core modules of app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//root component
import { AppComponent } from './app.component';
//routing module
import { AppRoutingModule } from './app-routing.module';
//3rd parties extensions
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

//App features modules
import { MainPageModule } from './components/main-page/main-page.module';
import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { ResidentListModule } from './components/resident-list/resident-list.module';
import { AddResidentModule } from './components/add-resident/add-resident.module';
import { NavbarModule } from './layout-components/navbar/navbar.module';
import { ResidentBlockModule } from './components/resident-list/resident-block/resident-block.module';

//Services
import { ResidentService } from './shared/resident/resident.service';
import { CitzenshipService } from './shared/citzenship/citzenship.service';
import { DormitoryService } from './shared/dormitory.service';
import { UserSessionService } from './shared/user-session.service';
import { CityService } from './shared/city/city.service';
import { TypeAddressService } from './shared/type-address/type-address.service';
import { TypeDocumentService } from './shared/type-document/type-document.service';


@NgModule({
    declarations: [
      AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, MultiselectDropdownModule,
    AddResidentModule, MainPageModule, PageNotFoundModule, ReactiveFormsModule, 
    ResidentListModule, NavbarModule, ResidentBlockModule, AppRoutingModule
    ],
  exports:[],
  providers: [ResidentService, DormitoryService, UserSessionService, 
    CitzenshipService, CityService, TypeAddressService, TypeDocumentService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
