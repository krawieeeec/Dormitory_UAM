import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentPersonalData } from '../../../../shared/resident/resident-personal-data';

//Services
import { ResidentService } from '../../../../shared/resident/resident.service';
import { CitzenshipService } from '../../../../shared/citzenship/citzenship.service';
import { ResidentEditService } from '../resident-edit.service';

@Component({
  selector: 'resident-personal-data',
  templateUrl: './resident-personal-data.component.html',
  styleUrls: ['./resident-personal-data.component.css']
})

export class ResidentPersonalDataComponent implements OnChanges, OnInit, DoCheck {
  
  
  private residentPersonalData;
  private listOfGenre;
  private listOfCitzenships;
  @Input() switchInputs;
  @Input() residentId:number;
  @Output() emitResidentPersonalData;

  constructor(
    private residentService: ResidentService,
    private residentEditService: ResidentEditService,
    private residentCitzenshipService: CitzenshipService
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
      citzenshipCodeId: 0
    }
    
    this.listOfGenre = [{index: 1, genre: 'Kobieta'},{index: 2, genre: 'Mężczyzna'}];
    this.listOfCitzenships = [];
    this.emitResidentPersonalData = new EventEmitter<object>();   
  }
  
  ngOnInit(){
  
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
            this.residentPersonalData.citzenshipCodeId = residentPersonalData[0].citzenship_code_id;

            this.emitResidentPersonalData.emit(this.residentPersonalData);

          } 
        );
    this.residentCitzenshipService.GetAllCitzenships()
        .then(
          citzenships =>{
            this.listOfCitzenships = citzenships;
            console.log(this.listOfCitzenships);
          }
        )
  }

  ngOnChanges() {

  }
  
  ngDoCheck(){
    this.emitResidentPersonalData.emit(this.residentPersonalData);
    console.log(this.residentPersonalData)
  }
/*
  ShowListGenre(value){
    let indexOfSubString = -1;
    this.listOfGenre.forEach(item => {
      let x = item.genre.indexOf(value);
      indexOfSubString = x;
      if(x > -1){
        return x;
      }
    });
    return indexOfSubString;
  }
*/
  SetCitzenship(chosenCitzenship){
    this.residentPersonalData.citzenship = chosenCitzenship.name;
    this.residentPersonalData.citzenship_code_id = chosenCitzenship.id;
  }
  DisableScroll(event){
    let imageWrapperDivElement = document.getElementById("image_wrapper");
    imageWrapperDivElement.style.overflowY = "auto";
    event.target.preventDefault();
  }
  EnableScroll(){
    let imageWrapperDivElement = document.getElementById("image_wrapper");
        imageWrapperDivElement.style.overflowY = "visible";
  }
}
