import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page.component';


@NgModule({
    imports:[
        CommonModule
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