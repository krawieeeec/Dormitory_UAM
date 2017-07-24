import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ResidentListComponent } from './resident-list.component';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        ResidentListComponent
    ],
    providers:[

    ],
    exports: [
        ResidentListComponent
    ]
})

export class ResidentListModule {
    
}