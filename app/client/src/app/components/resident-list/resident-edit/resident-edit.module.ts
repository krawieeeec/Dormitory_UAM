import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';
import { FormsModule } from '@angular/forms';


import { ResidentEditComponent } from './resident-edit.component';
//Components Child 
import { ResidentPersonalDataModule } from './resident-personal-data/resident-personal-data.module';
import { ResidentDocumentModule } from './resident-document/resident-document.module';
import { ResidentAddressModule } from './resident-address/resident-address.module';
import { ResidentDormitoryModule } from './resident-dormitory/resident-dormitory.module';
//Services
import {ResidentEditService } from './resident-edit.service';

@NgModule({
    imports:[
        CommonModule, FormsModule, ResidentPersonalDataModule, ResidentAddressModule, ResidentDocumentModule, 
        ResidentDormitoryModule, AppRoutingModule
    ],
    declarations: [
        ResidentEditComponent    
      ],
    providers:[
        ResidentEditService
    ],
    exports: [
        ResidentEditComponent
    ]
})

export class ResidentEditModule {
    
}