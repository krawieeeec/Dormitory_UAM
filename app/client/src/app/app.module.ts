//core modules of app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//root component
import { AppComponent } from './app.component';
//modal component
import { AppModalComponent } from './shared/app-modal/app-modal.component';
//routing module
import { AppRoutingModule } from './app-routing.module';
//3rd parties extensions
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

//App features modules
import { MainPageModule } from './components/main-page/main-page.module';
import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { ResidentListModule } from './components/resident-list/resident-list.module';
import { ResidentAddModule } from './components/resident-list/resident-add/resident-add.module';
import { NavbarModule } from './layout-components/navbar/navbar.module';


//Services
import { ResidentService } from './shared/resident/resident.service';
import { CitzenshipService } from './shared/citzenship/citzenship.service';
import { DormitoryService } from './shared/dormitory.service';
import { UserSessionService } from './shared/user-session.service';
import { CityService } from './shared/city/city.service';
import { TypeAddressService } from './shared/type-address/type-address.service';
import { TypeDocumentService } from './shared/type-document/type-document.service';
import { BlockadeHistoryService } from './shared/blockade-history/blockade-history.service';
import { ResidentStayService } from './shared/resident-stay/resident-stay.service';
import { AccountEmployeeService } from './shared/account-employee/account-employee.service';

@NgModule({
    declarations: [
      AppComponent,
      AppModalComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, MultiselectDropdownModule,
    ResidentAddModule, MainPageModule, PageNotFoundModule, ReactiveFormsModule, 
    ResidentListModule, NavbarModule, AppRoutingModule, BootstrapModalModule
    ],
    entryComponents: [
      AppModalComponent
    ],
  exports:[],
  providers: [ResidentService, DormitoryService, UserSessionService, 
    CitzenshipService, CityService, TypeAddressService, TypeDocumentService,
    BlockadeHistoryService, ResidentStayService, AccountEmployeeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
