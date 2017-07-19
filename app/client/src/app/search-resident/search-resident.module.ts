import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResidentComponent } from './search-resident.component';


@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        SearchResidentComponent
    ],
    providers:[

    ],
    exports: [
        SearchResidentComponent
    ]
})

export class SearchResidentModule {
    
}