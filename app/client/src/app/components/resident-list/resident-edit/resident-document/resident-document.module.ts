import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResidentDocumentComponent } from './resident-document.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

@NgModule({
    imports:[
        CommonModule, FormsModule, MultiselectDropdownModule
    ],
    declarations: [
        ResidentDocumentComponent
      ],
    providers:[

    ],
    exports: [
        ResidentDocumentComponent
    ]
})

export class ResidentDocumentModule {
    
}