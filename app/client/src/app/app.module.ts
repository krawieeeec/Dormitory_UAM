//core modules of app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

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

//Services
import { ResidentService } from './shared/resident.service';

@NgModule({
    declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule,
    AddResidentModule, DormitoryListModule, EditUserAccountModule,
    MainPageModule, PageNotFoundModule, SearchResidentModule
  ],
  exports:[],
  providers: [ResidentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
