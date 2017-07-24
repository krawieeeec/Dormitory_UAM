import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';

import { ResidentListComponent } from './resident-list.component';

@NgModule({
    imports:[
        CommonModule, AppRoutingModule
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