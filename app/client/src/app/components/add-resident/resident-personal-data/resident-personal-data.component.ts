import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentPersonalData } from '../../../shared/resident/resident-personal-data';

import { ResidentService } from '../../../shared/resident/resident.service';
import { AddResidentService } from '../add-resident.service';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'resident-personal-data',
  templateUrl: './resident-personal-data.component.html',
  styleUrls: ['./resident-personal-data.component.css']
})

export class ResidentPersonalDataComponent implements OnChanges, OnInit, DoCheck {
  
  private myTexts: IMultiSelectTexts;
  private mySettings: IMultiSelectSettings;
  private optionsModel: number[];
  private myOptions: IMultiSelectOption[];
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
    this.myOptions = [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
        ];
          this.mySettings = {
            autoUnselect: true,
            selectionLimit: 1,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block form-control',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
};

this.myTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Wybierz',
    allSelected: 'All selected',
    searchEmptyResult: 'Brak'
};
  }

  ngOnChanges() {
    console.log(this.optionsModel);
  }
  
  ngDoCheck(){
    this.emitResidentPersonalData.emit(this.residentPersonalData);
  }
}
