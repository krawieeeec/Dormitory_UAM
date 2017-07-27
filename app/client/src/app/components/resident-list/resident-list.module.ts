import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';

import { ResidentListComponent } from './resident-list.component';
import { ResidentEditModule } from './resident-edit/resident-edit.module';

@NgModule({
    imports:[
        CommonModule, ResidentEditModule, AppRoutingModule
    ],
    declarations: [
        ResidentListComponent,
      ],
    providers:[

    ],
    exports: [
        ResidentListComponent
    ]
})

export class ResidentListModule {
    
}