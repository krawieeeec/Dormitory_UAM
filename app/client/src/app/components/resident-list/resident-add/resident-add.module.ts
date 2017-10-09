import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { ResidentAddComponent } from './resident-add.component';

//Components Child 
import { ResidentPersonalDataComponent } from './resident-personal-data/resident-personal-data.component';
import { ResidentDocumentComponent } from './resident-document/resident-document.component';
import { ResidentAddressComponent } from './resident-address/resident-address.component';
import { ResidentDormitoryComponent } from './resident-dormitory/resident-dormitory.component';
import { ResidentSearchComponent } from './resident-search/resident-search.component';

import { ResidentAddService } from './resident-add.service';

@NgModule({
    imports:[
        CommonModule, FormsModule, MultiselectDropdownModule
    ],
    declarations: [
        ResidentAddComponent, ResidentAddressComponent, ResidentDocumentComponent,
        ResidentDormitoryComponent, ResidentPersonalDataComponent, ResidentSearchComponent   
      ],
    providers:[
        ResidentAddService
    ],
    exports: [
        ResidentAddComponent
    ]
})

export class ResidentAddModule {
    
}