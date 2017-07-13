import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DormitoryListComponent } from './dormitory-list.component';


@NgModule({
    imports:[
        CommonModule
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