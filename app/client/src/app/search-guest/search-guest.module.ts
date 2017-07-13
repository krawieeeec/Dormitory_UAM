import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchGuestComponent } from './search-guest.component';


@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        SearchGuestComponent
    ],
    providers:[

    ],
    exports: [
        SearchGuestComponent
    ]
})

export class SearchGuestModule {

}