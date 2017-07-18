import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { DormitoryListComponent } from './dormitory-list.component';

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
        DormitoryListComponent, AngularMaterialModule
    ]
})

export class DormitoryListModule {

}