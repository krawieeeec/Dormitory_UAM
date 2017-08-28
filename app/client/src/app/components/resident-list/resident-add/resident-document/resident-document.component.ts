import { Component, EventEmitter, Output, OnInit, OnChanges, DoCheck, Input } from '@angular/core';

import { NgModel } from '@angular/forms';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { ResidentAddService } from '../resident-add.service';
import { TypeDocumentService } from '../../../../shared/type-document/type-document.service';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'resident-document',
  templateUrl: './resident-document.component.html',
  styleUrls: ['./resident-document.component.css']
})
export class ResidentDocumentComponent implements OnInit, OnChanges, DoCheck {


  private typeDocumentList: IMultiSelectOption[];
  private tempTypeDocumentList: IMultiSelectOption[];
  private settingsSelectButton: IMultiSelectSettings; 
  private settingsTextSelectButton: IMultiSelectTexts;
  private selectedTypeDocument;
  private previousSelectedTypeDocument;
  private residentDocument;
  @Output() emitResidentDocument;

  constructor(
    private residentService: ResidentService,
    private residentAddService: ResidentAddService,
    private typeDocumentService: TypeDocumentService
  ) {
    this.residentDocument = {
      releaseDate: '',
      expirationDate: '',
      issuingCountry: '',
      typeDocument: '',
      documentTypeId: 0,
      residentId: 0
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
    searchPlaceholder: 'Wpisz ty dokumentu',
    defaultTitle: 'Wybierz Typ Dokumentu',
    searchEmptyResult: 'Brak',
    searchNoRenderText: 'Wpisz typ dokumentu w wyszukiwarce'
  };

    this.emitResidentDocument = new EventEmitter<object>();

    this.typeDocumentList = [];
    this.tempTypeDocumentList = [];
    this.selectedTypeDocument = [];
    this.previousSelectedTypeDocument = 0;
  }

  ngOnInit() {  
    this.typeDocumentService.GetAllTypeDocuments()
    .then( typeDocuments  =>{
      typeDocuments.forEach((element, index) => {
        this.tempTypeDocumentList.push(
        {
          id: element.id,
          name: element.typeDocument
        })  
      });
      this.typeDocumentList = this.tempTypeDocumentList;
    })
  }
  
  ngOnChanges(){
  }

  ngDoCheck(){
    this.emitResidentDocument.emit(this.residentDocument);

    if(this.selectedTypeDocument.length > 0 && (this.previousSelectedTypeDocument != this.selectedTypeDocument[0])){
      this.typeDocumentList.forEach(element => {
        if(element.id == this.selectedTypeDocument[0]){
           this.residentDocument.documentTypeId = element.id;
           this.residentDocument.typeDocument = element.name;
        }
      });
      this.previousSelectedTypeDocument = this.selectedTypeDocument[0];
      console.log(this.residentDocument);
    };
  }

}
