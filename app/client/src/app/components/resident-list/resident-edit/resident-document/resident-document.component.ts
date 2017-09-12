import { Component, EventEmitter, Output, OnInit, OnChanges, DoCheck, Input } from '@angular/core';

import { NgModel } from '@angular/forms';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { CityService } from '../../../../shared/city/city.service';
import { TypeAddressService } from '../../../../shared/type-address/type-address.service';
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
  private residentDocumentList;
  private showDocumentForm;

  @Input() switchInputs;
  @Input() residentId:number;
  @Output() emitResidentDocument;
  @Output() emitIsResidentDocumentTableOpen

  constructor(
    private residentService: ResidentService,
    private typeDocumentService : TypeDocumentService
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
    this.emitIsResidentDocumentTableOpen = new EventEmitter<boolean>();

    this.typeDocumentList = [];
    this.tempTypeDocumentList = [];
    this.selectedTypeDocument = [];
    this.residentDocumentList = [];
    
    this.showDocumentForm = false;
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

      this.residentService.GetResidentDocumentsById(this.residentId)
      .then(residentDocuments =>{
        
        this.residentDocumentList = residentDocuments;
        // this.residentDocument.releaseDate = residentDocument[0].release_date;
        // this.residentDocument.expirationDate = residentDocument[0].expiration_date;
        // this.residentDocument.issuingCountry = residentDocument[0].issuing_country;
        // this.residentDocument.typeDocument = residentDocument[0].type_document;
        // this.residentDocument.documentTypeId = residentDocument[0].document_type_id;
        // this.residentDocument.residentId = this.residentId;
        
        this.selectedTypeDocument.push(this.residentDocument.documentTypeId);
        
        this.emitResidentDocument.emit(this.residentDocument);
      })
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
    };
  }

  AddNewDocument(){
    if(!this.showDocumentForm){
      this.showDocumentForm = true;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
        
  }
    
  GoBackToDocumentTable(){
    if(this.showDocumentForm){
      this.showDocumentForm = false;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
  }

}
