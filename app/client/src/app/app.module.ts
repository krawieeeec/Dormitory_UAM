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
import { AddResidentModule } from './add-resident/add-resident.module';
import { DormitoryListModule } from './dormitory-list/dormitory-list.module';
import { EditUserAccountModule } from './edit-user-account/edit-user-account.module';
import { MainPageModule } from './main-page/main-page.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { SearchResidentModule } from './search-resident/search-resident.module';
import { ResidentListModule } from './resident-list/resident-list.module';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'; 

//Services
import { ResidentService } from './shared/resident.service';
import { DormitoryService } from './shared/dormitory.service';
//Classes


@NgModule({
    declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule,
    AddResidentModule, DormitoryListModule, EditUserAccountModule,
    MainPageModule, PageNotFoundModule, SearchResidentModule, NgbModule.forRoot(), ReactiveFormsModule, 
    ResidentListModule
  ],
  exports:[],
  providers: [ResidentService, DormitoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
