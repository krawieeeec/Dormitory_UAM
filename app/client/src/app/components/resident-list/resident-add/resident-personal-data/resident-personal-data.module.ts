import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';


import { ResidentPersonalDataComponent } from './resident-personal-data.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

@NgModule({
    imports:[
        CommonModule, FormsModule, MultiselectDropdownModule, Select2Module 
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