import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MainPageComponent } from './main-page.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
    imports:[
        CommonModule, AppRoutingModule
    ],
    declarations: [
        MainPageComponent
    ],
    providers:[

    ],
    exports: [
        MainPageComponent
    ]
})

export class MainPageModule {
    
}