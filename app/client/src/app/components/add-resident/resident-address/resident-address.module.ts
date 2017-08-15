import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResidentAddressComponent } from './resident-address.component';

@NgModule({
    imports:[
        CommonModule, FormsModule
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