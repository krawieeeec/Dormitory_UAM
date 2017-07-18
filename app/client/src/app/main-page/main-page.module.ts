import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';


@NgModule({
    imports:[
        CommonModule, AppRoutingModule, AngularMaterialModule
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