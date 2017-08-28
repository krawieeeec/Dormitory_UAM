import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { ResidentBlockComponent } from './resident-block.component';

@NgModule({
    imports:[
        CommonModule, FormsModule , MultiselectDropdownModule
    ],
    declarations: [
        ResidentBlockComponent
      ],
    providers:[
      
    ],
    exports: [
        ResidentBlockComponent
    ]
})

export class ResidentBlockModule {
    
}