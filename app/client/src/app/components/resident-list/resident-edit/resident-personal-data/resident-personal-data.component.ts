import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentPersonalData } from '../../../../shared/resident/resident-personal-data';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { ResidentEditService } from '../resident-edit.service';

@Component({
  selector: 'resident-personal-data',
  templateUrl: './resident-personal-data.component.html',
  styleUrls: ['./resident-personal-data.component.css']
})

export class ResidentPersonalDataComponent implements OnChanges, OnInit, DoCheck {
  
  //private residentId:number;
  private residentPersonalData:object;
  @Input() residentId:number;
  @Output() emitResidentPersonalData;

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

    this.emitResidentPersonalData = new EventEmitter<object>();   
  }
  
  ngOnInit(){
    this.residentService.GetResidentPersonalDataById(this.residentId)
        .then(
          residentPersonalData => {
            this.residentPersonalData = residentPersonalData;
            this.emitResidentPersonalData.emit(this.residentPersonalData);
          } 
        );
  }

  ngOnChanges() {

  }
  
  ngDoCheck(){
    this.emitResidentPersonalData.emit(this.residentPersonalData);
  }
}
