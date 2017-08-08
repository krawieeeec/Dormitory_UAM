import { Component, EventEmitter, Output, OnInit, Input, OnChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Resident} from '../../../../shared/resident';

import { ResidentService } from '../../../../shared/resident.service';
import { ResidentEditService } from '../resident-edit.service';

@Component({
  selector: 'resident-personal-data',
  templateUrl: './resident-personal-data.component.html',
  styleUrls: ['./resident-personal-data.component.css']
})

export class ResidentPersonalDataComponent implements OnChanges, OnInit {

  private residentPersonalData:object;
  private residentId:number;

  constructor(
    private residentService: ResidentService,
    private residentEditService: ResidentEditService
  ) {
    this.residentPersonalData = {
            name: '',
            surname: '',
            genre: '',
            birthDate: '',
            birthPlace: '',
            motherName: '',
            fatherName: '',
            pesel: '',
            citzenship_code_id: 0
        }   
  }
  
  ngOnInit(){
    this.residentId = this.residentEditService.GetResidentId();
    this.residentService.GetResidentPersonalDataById(this.residentId)
        .then(residentPersonalData =>{
            this.residentPersonalData = residentPersonalData;
        } 
        );  
  }

  ngOnChanges() {
  }
  
  UpdateResidentPersonalData():void{
    this.residentEditService.SetResidentPersonalData(this.residentPersonalData);
  }
  
}
