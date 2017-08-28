import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ResidentAddressComponent } from './resident-address.component';

@NgModule({
    imports:[
        CommonModule, FormsModule, MultiselectDropdownModule
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