import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResidentPersonalDataComponent } from './resident-personal-data.component';

@NgModule({
    imports:[
        CommonModule, FormsModule 
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