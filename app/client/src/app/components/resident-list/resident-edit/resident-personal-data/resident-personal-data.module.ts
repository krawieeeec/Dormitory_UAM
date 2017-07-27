import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentPersonalDataComponent } from './resident-personal-data.component';

@NgModule({
    imports:[
        CommonModule
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