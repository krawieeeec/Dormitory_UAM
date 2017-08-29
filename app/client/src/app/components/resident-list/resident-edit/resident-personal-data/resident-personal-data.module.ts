import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResidentPersonalDataComponent } from './resident-personal-data.component';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports:[
        CommonModule, FormsModule, MyDatePickerModule, MultiselectDropdownModule
    ],
    declarations: [
        ResidentPersonalDataComponent
      ],
    providers:[

    ],
    exports: [
        ResidentPersonalDataComponent
    ]
})

export class ResidentPersonalDataModule {
    
}