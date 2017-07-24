import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddResidentComponent } from './add-resident.component';


@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        AddResidentComponent
    ],
    providers:[

    ],
    exports: [
        AddResidentComponent
    ]
})

export class AddResidentModule {

}