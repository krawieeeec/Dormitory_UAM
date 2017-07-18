import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DormitoryListComponent } from './dormitory-list.component';
import { AngularMaterialModule } from '../shared/angular-material.module';

@NgModule({
    imports:[
        CommonModule, AngularMaterialModule
    ],
    declarations: [
        DormitoryListComponent
    ],
    providers:[

    ],
    exports: [
        DormitoryListComponent
    ]
})

export class DormitoryListModule {

}