import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ResidentDormitoryComponent } from './resident-dormitory.component';

@NgModule({
    imports:[
        CommonModule, FormsModule
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