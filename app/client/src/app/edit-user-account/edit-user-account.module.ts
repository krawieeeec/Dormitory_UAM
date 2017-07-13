import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserAccountComponent } from './edit-user-account.component';


@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [
        EditUserAccountComponent
    ],
    providers:[

    ],
    exports: [
        EditUserAccountComponent
    ]
})

export class EditUserAccountModule {

}