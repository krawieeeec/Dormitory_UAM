import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddGuestComponent } from './add-guest.component';


@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        AddGuestComponent
    ],
    providers:[

    ],
    exports: [
        AddGuestComponent
    ]
})

export class AddGuestModule {

}