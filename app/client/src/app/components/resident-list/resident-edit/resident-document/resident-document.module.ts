import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentDocumentComponent } from './resident-document.component';

@NgModule({
    imports:[
        CommonModule
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