import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';
import { FormsModule } from '@angular/forms';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MyDatePickerModule } from 'mydatepicker';

import { ResidentEditComponent } from './resident-edit.component';

//Components Child 
import { ResidentPersonalDataComponent } from './resident-personal-data/resident-personal-data.component';
import { ResidentDocumentComponent } from './resident-document/resident-document.component';
import { ResidentAddressComponent } from './resident-address/resident-address.component';
import { ResidentDormitoryComponent } from './resident-dormitory/resident-dormitory.component';

import { ResidentEditService } from './resident-edit.service';

@NgModule({
    imports:[
        CommonModule, FormsModule, MyDatePickerModule, MultiselectDropdownModule, 
        AppRoutingModule
    ],
    declarations: [
        ResidentEditComponent, ResidentAddressComponent, ResidentDocumentComponent, 
        ResidentDormitoryComponent, ResidentPersonalDataComponent    
      ],
    providers:[
        ResidentEditService
    ],
    exports: [
        ResidentEditComponent
    ]
})

export class ResidentEditModule {
    
}