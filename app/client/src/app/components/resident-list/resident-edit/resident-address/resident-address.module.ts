import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentAddressComponent } from './resident-address.component';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        ResidentAddressComponent
      ],
    providers:[

    ],
    exports: [
        ResidentAddressComponent
    ]
})

export class ResidentAddressModule {
    
}