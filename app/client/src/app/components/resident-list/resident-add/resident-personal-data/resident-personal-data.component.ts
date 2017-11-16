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
        motherName: true,
      },
      pesel: {
        specialCharactersAndNonDigitCharacters: true,
        incorrectPesel: true,
        whiteSpaces: true
      },
      phoneNumber: true,
      genre: true,
      birthDate: true
      
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
    
    var phoneNumber = [], specialCharactersInInput = [], numbersInInput = [], stringWithoutWhiteSpace = '',
    nonDigitcharactersInInput = [], apostropheOrDashInNameOrSurname =[];

    stringWithoutWhiteSpace = input.replace(/\s/g,'')
    specialCharactersInInput = stringWithoutWhiteSpace.match(/\W/g);
    apostropheOrDashInNameOrSurname = stringWithoutWhiteSpace.match(/[-']{1,}/g);
    numbersInInput = stringWithoutWhiteSpace.match(/\d/g);
    nonDigitcharactersInInput = input.match(/\D/g);
    phoneNumber = input.match(/\+[0-9]*\s*[0-9]*/g); 
    
    if(typeInput.name == 'name'){
      if(apostropheOrDashInNameOrSurname != null){
        if(numbersInInput != null){
          this.validationError.specialCharactersOrNumbers.name = false;  
        }else if(specialCharactersInInput != null){
          let diffrentChar = false;
          specialCharactersInInput.forEach(element => {
            if((element != '-') && (element != "'")){
              diffrentChar = true;
            }
          });
          if(diffrentChar){
            this.validationError.specialCharactersOrNumbers.name = false;
          }else{
            this.validationError.specialCharactersOrNumbers.name = true;
          }
        }else{
          this.validationError.specialCharactersOrNumbers.name = true;
        }
      }else if(apostropheOrDashInNameOrSurname == null){
        if((specialCharactersInInput != null || numbersInInput != null)){
            this.validationError.specialCharactersOrNumbers.name = false;
          }else if((specialCharactersInInput == null && numbersInInput == null)){
            this.validationError.specialCharactersOrNumbers.name = true;
          }
      }
    }
    else if(typeInput.name == 'surname'){
      if(apostropheOrDashInNameOrSurname != null){
        if(numbersInInput != null){
          this.validationError.specialCharactersOrNumbers.surname = false;  
        }else if(specialCharactersInInput != null){
          let diffrentChar = false;
          specialCharactersInInput.forEach(element => {
            if((element != '-') && (element != "'")){
              diffrentChar = true;
            }
          });
          if(diffrentChar){
            this.validationError.specialCharactersOrNumbers.surname = false;
          }else{
            this.validationError.specialCharactersOrNumbers.surname = true;
          }
        }else{
          this.validationError.specialCharactersOrNumbers.surname = true;
        }
      }else if(apostropheOrDashInNameOrSurname == null){
        if((specialCharactersInInput != null || numbersInInput != null)){
            this.validationError.specialCharactersOrNumbers.surname = false;
          }else if((specialCharactersInInput == null && numbersInInput == null)){
            this.validationError.specialCharactersOrNumbers.surname = true;
          }
      }
    }else if(typeInput.name == 'birthPlace'){
      if((specialCharactersInInput != null || numbersInInput != null)){
        this.validationError.specialCharactersOrNumbers.birthPlace = false;
      }else if((specialCharactersInInput == null && numbersInInput == null)){
        this.validationError.specialCharactersOrNumbers.birthPlace = true;
      }
    }else if(typeInput.name == 'fatherName'){
      if((specialCharactersInInput != null || numbersInInput != null)){
        this.validationError.specialCharactersOrNumbers.fatherName = false;
      }else if((specialCharactersInInput == null && numbersInInput == null)){
        this.validationError.specialCharactersOrNumbers.fatherName = true;
      }
    }else if(typeInput.name == 'motherName'){
      if((specialCharactersInInput != null || numbersInInput != null)){
        this.validationError.specialCharactersOrNumbers.motherName = false;
      }else if((specialCharactersInInput == null && numbersInInput == null)){
        this.validationError.specialCharactersOrNumbers.motherName = true;
      }
    }else if(typeInput.name == 'phoneNumber'){
      if(phoneNumber != null){
        if(input == phoneNumber[0]){
          this.validationError.phoneNumber = true;
        }else{
          this.validationError.phoneNumber = false;
        }
      }else if((phoneNumber == null) && (input != '')){
        this.validationError.phoneNumber = false;
      }else if((phoneNumber == null) && (input == '')){
        this.validationError.phoneNumber = true;
      }
    }else if(typeInput.name == 'pesel'){
      if(nonDigitcharactersInInput != null){
        this.validationError.pesel.specialCharactersAndNonDigitCharacters = false;
      }else{
        this.validationError.pesel.specialCharactersAndNonDigitCharacters = true;
      }
      if((this.residentPersonalData.pesel.length < 11) && (this.validationError.pesel.incorrectPesel == false)){
        this.validationError.pesel.incorrectPesel = true;
      }
      if((this.residentPersonalData.pesel.length < 11) && (this.validationError.birthDate == false)){
        this.validationError.birthDate = true;
      }
      
      if(this.residentPersonalData.pesel.length == 11){
        let peselExpression = 0, peselControlDigit = 0;
        let dateBirthFromPesel = '', year ='', month = '', day = '';
        
        if((this.residentPersonalData.pesel[2] == '8') || (this.residentPersonalData.pesel[2] == '9')){
          
          if(this.residentPersonalData.birthDate != ""){
            year = '18'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '8'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '9'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          } 

        }else if((this.residentPersonalData.pesel[2] == '0') || (this.residentPersonalData.pesel[2] == '1')){
          
          if(this.residentPersonalData.birthDate != ""){
            year = '19'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '0'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '1'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }
        
        }else if((this.residentPersonalData.pesel[2] == '2') || (this.residentPersonalData.pesel[2] == '3')){
          
          if(this.residentPersonalData.birthDate != ""){
            year = '20'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '2'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '3'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }

        }else if((this.residentPersonalData.pesel[2] == '4') || (this.residentPersonalData.pesel[2] == '5')){
  
          if(this.residentPersonalData.birthDate != ""){
            year = '21'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '4'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '5'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }
          
        }else if((this.residentPersonalData.pesel[2] == '6') || (this.residentPersonalData.pesel[2] == '7')){
          
          if(this.residentPersonalData.birthDate != ""){
            year = '22'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '6'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '7'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }
          
        }
        if(
          (this.residentPersonalData.pesel[9] == '1') || (this.residentPersonalData.pesel[9] == '3') ||
          (this.residentPersonalData.pesel[9] == '5') || (this.residentPersonalData.pesel[9] == '7') ||
          (this.residentPersonalData.pesel[9] == '9')
        ){
          if(this.residentPersonalData.genre == 'Kobieta'){
            this.validationError.genre = false
          }else{
            this.validationError.genre = true;
          }
        }else{
          if(this.residentPersonalData.genre == 'Mężczyzna'){
            this.validationError.genre = false;
          }else{
            this.validationError.genre = true;
          }
        }
        
        peselExpression = (
          (9 * this.residentPersonalData.pesel[0]) + (7 * this.residentPersonalData.pesel[1]) + 
          (3 * this.residentPersonalData.pesel[2]) + (1 * this.residentPersonalData.pesel[3]) +
          (9 * this.residentPersonalData.pesel[4]) + (7 * this.residentPersonalData.pesel[5]) + 
          (3 * this.residentPersonalData.pesel[6]) + (1 * this.residentPersonalData.pesel[7]) +
          (9 * this.residentPersonalData.pesel[8]) + (7 * this.residentPersonalData.pesel[9]));
         
          peselControlDigit = (peselExpression % 10);
          
          if(peselControlDigit != this.residentPersonalData.pesel[10]){
            this.validationError.pesel.incorrectPesel = false;
          }else{
            this.validationError.pesel.incorrectPesel = true;
          }
      }
    }else if(typeInput.name == 'birthDate'){
      if((this.residentPersonalData.pesel.length < 11) && (this.validationError.birthDate == false)){
        this.validationError.birthDate = true;
      }
      
      if(this.residentPersonalData.pesel.length == 11){
        let peselExpression = 0, peselControlDigit = 0;
        let dateBirthFromPesel = '', year ='', month = '', day = '';
 
        if((this.residentPersonalData.pesel[2] == '8') || (this.residentPersonalData.pesel[2] == '9')){
          
          if(this.residentPersonalData.birthDate != ""){
            year = '18'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '8'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '9'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }
          
        }else if((this.residentPersonalData.pesel[2] == '0') || (this.residentPersonalData.pesel[2] == '1')){
          
          if(this.residentPersonalData.birthDate != ""){
            year = '19'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '0'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '1'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }
          
        }else if((this.residentPersonalData.pesel[2] == '2') || (this.residentPersonalData.pesel[2] == '3')){
          
          if(this.residentPersonalData.birthDate != "" ){
            year = '20'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '2'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '3'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }

        }else if((this.residentPersonalData.pesel[2] == '4') || (this.residentPersonalData.pesel[2] == '5')){
          
          if(this.residentPersonalData.birthDate != "") {
            year = '21'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '4'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '5'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }

        }else if((this.residentPersonalData.pesel[2] == '6') || (this.residentPersonalData.pesel[2] == '7')){
          
          if(this.residentPersonalData.birthDate != ""){
            year = '22'+this.residentPersonalData.pesel[0] + this.residentPersonalData.pesel[1] +'-';
            if(this.residentPersonalData.pesel[2] == '6'){
              month = '0' + this.residentPersonalData.pesel[3] + '-';
            }else if(this.residentPersonalData.pesel[2] == '7'){
              month = '1' + this.residentPersonalData.pesel[3] + '-';
            }
            day = this.residentPersonalData.pesel[4] + this.residentPersonalData.pesel[5];
            dateBirthFromPesel = year + month + day;
            if(this.residentPersonalData.birthDate == dateBirthFromPesel){
              this.validationError.birthDate = true;
            }else{
              this.validationError.birthDate = false;
            }
          }
          
        }
      }

    }else if(typeInput.name == 'genre'){
      
      if(this.residentPersonalData.pesel.length == 11){
        if(
          (this.residentPersonalData.pesel[9] == '1') || (this.residentPersonalData.pesel[9] == '3') ||
          (this.residentPersonalData.pesel[9] == '5') || (this.residentPersonalData.pesel[9] == '7') ||
          (this.residentPersonalData.pesel[9] == '9')
        ){
          if(this.residentPersonalData.genre == "Kobieta"){
            this.validationError.genre = false;
          }else{
            this.validationError.genre = true;
          }
        }else{
          if(this.residentPersonalData.genre == "Kobieta"){
            this.validationError.genre = true;
          }else{
            this.validationError.genre = false;
          }
        }
      }
    } 

  }

  
}

