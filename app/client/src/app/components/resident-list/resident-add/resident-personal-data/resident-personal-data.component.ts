import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ResidentPersonalData } from '../../../../shared/resident/resident-personal-data';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { CitzenshipService } from '../../../../shared/citzenship/citzenship.service';


import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'resident-personal-data',
  templateUrl: './resident-personal-data.component.html',
  styleUrls: ['./resident-personal-data.component.css']
})

export class ResidentPersonalDataComponent implements OnChanges, OnInit, DoCheck {
  
  private citzenshipsList: IMultiSelectOption[];
  private tempCitzenshipList: IMultiSelectOption[];
  private settingsSelectButton: IMultiSelectSettings; 
  private settingsTextSelectButton: IMultiSelectTexts;
  private residentPersonalData;
  private selectedCitzenship:number[];
  private previousSelectedCitzenship:number;
  private isResidentForeigner;
  private genreList;
  
  @Output() emitResidentPersonalData;


  constructor(
    private residentService: ResidentService,
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
        serialNumber: '',
        citzenshipCodeId: 0
      }

      this.settingsSelectButton  = {
        enableSearch: true,
        checkedStyle: 'glyphicon',
        buttonClasses: 'btn btn-default btn-block form-select',
        itemClasses: 'form-select ',
        containerClasses: 'form-select',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true,
        selectionLimit: 1,
        autoUnselect: true,
        searchRenderLimit: 2,
        closeOnClickOutside: true,
        searchMaxLimit: 3	
    };

    this.settingsTextSelectButton = {
      searchPlaceholder: 'Wpisz nazwę obywatelstwa',
      defaultTitle: 'Wybierz Obywatelstwo',
      searchEmptyResult: 'Brak',
      searchNoRenderText: 'Wpisz nazwę obywatelstwa w wyszukiwarce'
    };

    this.genreList = [
      'Kobieta', 'Mężczyzna'
  ]

    this.emitResidentPersonalData = new EventEmitter<object>();  
    this.citzenshipsList = [];
    this.tempCitzenshipList = [];
    this.selectedCitzenship = [];
    this.previousSelectedCitzenship = 0;
    this.isResidentForeigner = false;
  }

  /////////////////////////////////////////LIFE CYCLE OF COMPONENT///////////////////////////////////////////////

  ngOnInit(){
    this.residentCitzenshipService.GetAllCitzenships()
    .then( citzenships =>{
      citzenships.forEach((element, index) => {
        this.tempCitzenshipList.push(
        {
          id: element.id,
          name: element.citzenship
        })  
      });
      this.citzenshipsList = this.tempCitzenshipList;
    })
  }

  ngOnChanges() {
  }
  
  ngDoCheck(){
    this.emitResidentPersonalData.emit(this.residentPersonalData);
    if(this.selectedCitzenship.length > 0 && (this.previousSelectedCitzenship != this.selectedCitzenship[0])){
      this.citzenshipsList.forEach(element => {
        if(element.id == this.selectedCitzenship[0]){
           this.residentPersonalData.citzenshipCodeId = element.id;
           this.residentPersonalData.citzenship = element.name;
           if(this.residentPersonalData.citzenship != 'Polskie'){
            this.isResidentForeigner = true;
           }else{
             this.isResidentForeigner = false;
           }
        }
      });
      this.previousSelectedCitzenship = this.selectedCitzenship[0];
    };
  }

  /////////////////////////////////////////FUNCTION OF COMPONENT///////////////////////////////////////////////
  
  SetGenre(genreName){
    
    this.residentPersonalData.genre = genreName.value;
    // if(genreName.value == "Kobieta"){
    //   this.residentPersonalData.blockadeState = "Odblokowana";
    // }else{
    //   this.residentPersonalData.blockadeState = "Odblokowany";
    // }
  }

  CheckIsResidentExist(){
    let searchedAttributes = {
      pesel: '',
      serialNumber: '',
      citzenship: ''
    }
    
    if((this.residentPersonalData.citzenship == '') || 
      (this.residentPersonalData.citzenship == 'Polskie')){
        if(this.residentPersonalData.pesel.length == 11){
          searchedAttributes.pesel = this.residentPersonalData.pesel;
          searchedAttributes.citzenship = this.residentPersonalData.citzenship;
          this.residentService.FindExistingResident(searchedAttributes)
          .then(response => {
            if(response.isExist){
              console.log('MAMY POLAKA');
            }else{
              console.log('BRAK POLAKA')
            }
          })
        }
      }else{
        
        if(this.residentPersonalData.serialNumber.length > 0){
          searchedAttributes.serialNumber = this.residentPersonalData.serialNumber;
          this.residentService.FindExistingResident(searchedAttributes)
          .then(response => {
            if(response.isExist){
              console.log('MAMY OBCOKRAJOWCA');
            }else{
              console.log('NIE MAM OBCOKRAJOWCA');
            }
          })
        }
      }
  }
  
}
