import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';


import { ResidentEditComponent } from './resident-edit.component';
//Components Child 
import { ResidentPersonalDataModule } from './resident-personal-data/resident-personal-data.module';
import { ResidentDocumentModule } from './resident-document/resident-document.module';
import { ResidentAdressModule } from './resident-adress/resident-adress.module';
//Services
import {ResidentEditService } from './resident-edit.service';

@NgModule({
    imports:[
        CommonModule, ResidentPersonalDataModule, ResidentAdressModule, ResidentDocumentModule, AppRoutingModule
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