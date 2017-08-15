import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentPersonalData } from '../../../shared/resident/resident-personal-data';

import { ResidentService } from '../../../shared/resident/resident.service';
import { AddResidentService } from '../add-resident.service';

@Component({
  selector: 'resident-personal-data',
  templateUrl: './resident-personal-data.component.html',
  styleUrls: ['./resident-personal-data.component.css']
})

export class ResidentPersonalDataComponent implements OnChanges, OnInit, DoCheck {
  
  
  private residentPersonalData;
  @Output() emitResidentPersonalData;

  constructor(
    private residentService: ResidentService,
    private residentAddService: AddResidentService,
  ) {

    this.residentPersonalData = {
      name: '',
      surname: '',
      genre: '',
      phoneNumber: '',
      birthDate: '',
      birthPlace: '',
      motherName: '',
      fatherName: '',
      pesel: '',
      citzenship:'',
      citzenshipCodeId: 1
    }

    this.emitResidentPersonalData = new EventEmitter<object>();   
  }
  
  ngOnInit(){
  
  }

  ngOnChanges() {

  }
  
  ngDoCheck(){
    this.emitResidentPersonalData.emit(this.residentPersonalData);
  }
}
