import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddResidentComponent } from './add-resident.component';
//Components Child 
import { ResidentPersonalDataModule } from './resident-personal-data/resident-personal-data.module';
import { ResidentDocumentModule } from './resident-document/resident-document.module';
import { ResidentAddressModule } from './resident-address/resident-address.module';
import { ResidentDormitoryModule } from './resident-dormitory/resident-dormitory.module';
//Services
import { AddResidentService } from './add-resident.service';

@NgModule({
    imports:[
        CommonModule, FormsModule, ResidentPersonalDataModule, ResidentAddressModule, ResidentDocumentModule, 
        ResidentDormitoryModule
    ],
    declarations: [
        AddResidentComponent    
      ],
    providers:[
        AddResidentService
    ],
    exports: [
        AddResidentComponent
    ]
})

export class AddResidentModule {
    
}