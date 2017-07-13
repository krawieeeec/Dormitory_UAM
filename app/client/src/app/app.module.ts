import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//root component
import { AppComponent } from './app.component';
//routing module
import { AppRoutingModule } from './app-routing.module';

//App modules
import { AddGuestModule } from './add-guest/add-guest.module';
import { DormitoryListModule } from './dormitory-list/dormitory-list.module';
import { EditUserAccountModule } from './edit-user-account/edit-user-account.module';
import { MainPageModule } from './main-page/main-page.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { SearchGuestModule } from './search-guest/search-guest.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule,
    AddGuestModule, DormitoryListModule, EditUserAccountModule,
    MainPageModule, PageNotFoundModule, SearchGuestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
