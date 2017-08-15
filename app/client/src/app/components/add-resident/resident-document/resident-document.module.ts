import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResidentDocumentComponent } from './resident-document.component';

@NgModule({
    imports:[
        CommonModule, FormsModule
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