import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';

import { ResidentListComponent } from './resident-list.component';
import { ResidentBlockComponent } from './resident-block/resident-block.component';

import { ResidentEditModule } from './resident-edit/resident-edit.module';
import { ResidentAddModule } from './resident-add/resident-add.module';

import { ResidentListService } from './services/resident-list.serivce';
import { ResidentAccountService } from '../../shared/resident-account/resident-account.service';

@NgModule({
    imports:[
        CommonModule, FormsModule, ResidentEditModule, ResidentAddModule, AppRoutingModule
    ],
    declarations: [
        ResidentListComponent, ResidentBlockComponent
      ],
    providers:[
        ResidentListService, ResidentAccountService
    ],
    exports: [
        ResidentListComponent
    ]
})

export class ResidentListModule {
    
}