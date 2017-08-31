import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentPersonalData } from '../../../../shared/resident/resident-personal-data';
import { IMyDpOptions } from 'mydatepicker';
//Services
import { ResidentService } from '../../../../shared/resident/resident.service';
import { CitzenshipService } from '../../../../shared/citzenship/citzenship.service';
import { ResidentEditService } from '../resident-edit.service';


import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';


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
  private selectedCitzenship:number[];
  private previousSelectedCitzenship:number;
  private residentPersonalData;
  private listOfCitzenships;
  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    todayBtnTxt: 'Dzisiaj',
    showClearDateBtn: true
};
private model: Object = { date: { year: 2018, month: 10, day: 9 } };
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
    
    this.emitResidentPersonalData = new EventEmitter<object>();   
    this.citzenshipsList = [];
    this.tempCitzenshipList = [];
    this.selectedCitzenship = [];
    this.previousSelectedCitzenship = 0;
    
  }
  
  
  ngOnInit(){
    
    this.residentCitzenshipService.GetAllCitzenships()
    .then(
      citzenships => {
        citzenships.forEach((element, index) => {
          this.tempCitzenshipList.push(
          {
            id: element.id,
            name: element.citzenship
          })
          this.citzenshipsList = this.tempCitzenshipList;  
        });

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
            this.selectedCitzenship.push(residentPersonalData[0].citzenship_code_id);

          }
        );
      }
    )
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
        }
      });
      this.previousSelectedCitzenship = this.selectedCitzenship[0];
    };
  }

  SetGenre(genreName){
    
    this.residentPersonalData.genre = genreName.value;
    if(genreName.value == "Kobieta"){
      this.residentPersonalData.blockadeState = "Odblokowana";
    }else{
      this.residentPersonalData.blockadeState = "Odblokowany";
    }
  }
  
}
