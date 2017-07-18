import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule} from '../shared/angular-material.module';

import { SearchResidentComponent } from './search-resident.component';


@NgModule({
    imports:[
        CommonModule, AngularMaterialModule
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