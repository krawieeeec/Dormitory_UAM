import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
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
  private validationError;
  
  @Output() emitResidentPersonalData;
  @Input() getResidentPersonalData: any; 

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
        isExist: false,
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

    this.validationError = {
      specialCharactersOrNumbers: {
        name: true,
        surname: true,
        birthPlace: true,
        fatherName: true,
        motherName: true
      },
      phoneNumber: true
    }
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

    this.residentPersonalData = this.getResidentPersonalData;
    
    this.selectedCitzenship.push(this.residentPersonalData.citzenshipCodeId);
    
    this.CheckIsResidentPeselExist();
  }
  
  ngDoCheck(){
    if(this.selectedCitzenship.length == 2){
         this.selectedCitzenship.shift();
       }
    this.emitResidentPersonalData.emit(this.residentPersonalData);
    if(this.selectedCitzenship.length > 0 && (this.previousSelectedCitzenship != this.selectedCitzenship[0])){
      this.citzenshipsList.forEach(element => {
        if(element.id == this.selectedCitzenship[0]){
          
           this.residentPersonalData.citzenshipCodeId = element.id;
           this.residentPersonalData.citzenship = element.name;
        }
      });
      this.previousSelectedCitzenship = this.selectedCitzenship[0];
      
    };
  }

  /////////////////////////////////////////FUNCTION OF COMPONENT///////////////////////////////////////////////
  
  SetGenre(genreName){
    this.residentPersonalData.genre = genreName.value.slice(3);
  }

  CheckIsResidentPeselExist(){
    
    let searchedAttributes = {
      pesel: '',
      serialNumber: ''
    }
    
    if(this.residentPersonalData.pesel != null){
      if(this.residentPersonalData.pesel.length == 11){
        searchedAttributes.pesel = this.residentPersonalData.pesel;
        this.residentService.FindExistingResident(searchedAttributes)
        .then(response => {
          if(response.isExist){
            console.log('MAMY PESEL');
            this.residentPersonalData.isExist = true;
          }else{
            console.log('BRAK PESEL')
            this.residentPersonalData.isExist = false;
          }
        })
      }
    }
    
  }

  CheckValidation(input, typeInput){
    
    var characters = [], specialCharacters = [], numbers = [], stringWithoutWhiteSpace = '';

    stringWithoutWhiteSpace = input.replace(/\s/g,'')

    specialCharacters = stringWithoutWhiteSpace.match(/\W/g);
    numbers = stringWithoutWhiteSpace.match(/\d/g);
    characters = input.match(/\+[0-9]*\s*[0-9]*/g); 
    
    if(typeInput.name == 'name'){
      if((specialCharacters != null || numbers != null)){
        this.validationError.specialCharactersOrNumbers.name = false;
      }else if((specialCharacters == null && numbers == null)){
        this.validationError.specialCharactersOrNumbers.name = true;
      }
    }
    
    if(typeInput.name == 'surname'){
      if((specialCharacters != null || numbers != null)){
        this.validationError.specialCharactersOrNumbers.surname = false;
      }else if((specialCharacters == null && numbers == null)){
        this.validationError.specialCharactersOrNumbers.surname = true;
      }
    }

    if(typeInput.name == 'birthPlace'){
      if((specialCharacters != null || numbers != null)){
        this.validationError.specialCharactersOrNumbers.birthPlace = false;
      }else if((specialCharacters == null && numbers == null)){
        this.validationError.specialCharactersOrNumbers.birthPlace = true;
      }
    }

    if(typeInput.name == 'fatherName'){
      if((specialCharacters != null || numbers != null)){
        this.validationError.specialCharactersOrNumbers.fatherName = false;
      }else if((specialCharacters == null && numbers == null)){
        this.validationError.specialCharactersOrNumbers.fatherName = true;
      }
    }

    if(typeInput.name == 'motherName'){
      if((specialCharacters != null || numbers != null)){
        this.validationError.specialCharactersOrNumbers.motherName = false;
      }else if((specialCharacters == null && numbers == null)){
        this.validationError.specialCharactersOrNumbers.motherName = true;
      }
    }
    
    if(typeInput.name == 'phoneNumber'){
      if(characters != null){
        if(input == characters[0]){
          this.validationError.phoneNumber = true;
        }else{
          this.validationError.phoneNumber = false;
        }
      }else if((characters == null) && (input != '')){
        this.validationError.phoneNumber = false;
      }else if((characters == null) && (input == '')){
        this.validationError.phoneNumber = true;
      }      
    }

  }

  
}

