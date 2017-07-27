import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentDormitoryComponent } from './resident-dormitory.component';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        ResidentDormitoryComponent
      ],
    providers:[

    ],
    exports: [
        ResidentDormitoryComponent
    ]
})

export class ResidentDormitoryModule {
    
}