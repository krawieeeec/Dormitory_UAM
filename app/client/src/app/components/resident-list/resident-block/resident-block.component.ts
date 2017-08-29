import { Component, EventEmitter, Input, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

import { ResidentService } from '../../../shared/resident/resident.service';

@Component({
  selector: 'resident-block',
  templateUrl: './resident-block.component.html',
  styleUrls: ['./resident-block.component.css']
})

export class ResidentBlockComponent implements OnInit, DoCheck, OnChanges {

  private residentId;
  private residentPersonalData;
  private blockadeStateList;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location,
    private residentService: ResidentService 
  ) 
  {
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
      blockadeState: '',
      citzenshipCodeId: 0
    } 
    this.blockadeStateList = [];
  }


  ngOnInit() {
    this.residentId = this.route.snapshot.params.id;

    this.residentService.GetResidentPersonalDataById(this.residentId)
    .then(
      residentPersonalData => {
        
        this.residentPersonalData.name = residentPersonalData[0].name;
        this.residentPersonalData.surname = residentPersonalData[0].surname;
        this.residentPersonalData.genre = residentPersonalData[0].genre;
        this.residentPersonalData.phoneNumber = residentPersonalData[0].phone_number;
        this.residentPersonalData.birthDate = residentPersonalData[0].birth_date;
        this.residentPersonalData.birthPlace = residentPersonalData[0].birth_place;
        this.residentPersonalData.motherName = residentPersonalData[0].mother_name;
        this.residentPersonalData.fatherName = residentPersonalData[0].father_name;
        this.residentPersonalData.pesel = residentPersonalData[0].pesel;
        this.residentPersonalData.citzenship = residentPersonalData[0].citzenship;
        this.residentPersonalData.blockadeState = residentPersonalData[0].blockade_state;
        this.residentPersonalData.citzenshipCodeId = residentPersonalData[0].citzenship_code_id;

        if(
          (this.residentPersonalData.blockadeState == "Odblokowana") || 
          (this.residentPersonalData.blockadeState == "Zablokowana")
        ){
          this.blockadeStateList = [
            "Odblokowana", "Zablokowana"
          ]
        }else {
          this.blockadeStateList = [
            "Odblokowany", "Zablokowany"
          ]
        }
      }
    );

  }

  ngDoCheck(){
  }

  ngOnChanges(){
  
  }




}
