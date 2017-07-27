import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentAdressComponent } from './resident-adress.component';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        ResidentAdressComponent
      ],
    providers:[

    ],
    exports: [
        ResidentAdressComponent
    ]
})

export class ResidentAdressModule {
    
}