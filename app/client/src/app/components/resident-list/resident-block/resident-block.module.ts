import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { ResidentBlockComponent } from './resident-block.component';
import { ResidentAccountService} from '../../../shared/resident-account/resident-account.service';
import { UserSessionService } from '../../../shared/user-session.service';
@NgModule({
    imports:[
        CommonModule, FormsModule , MultiselectDropdownModule
    ],
    declarations: [
        ResidentBlockComponent
      ],
    providers:[
      ResidentAccountService, UserSessionService
    ],
    exports: [
        ResidentBlockComponent
    ]
})

export class ResidentBlockModule {
    
}