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
  private indexSelectedDocument;
  private idSelectedDocument;
  private showEditDocumentButton;

  
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
    this.showEditDocumentButton = false;
    this.previousSelectedTypeDocument = 0;
    this.indexSelectedDocument = 0;
    this.idSelectedDocument = 0;
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
        this.indexSelectedDocument = undefined;
  }

  SaveDocument(){

    let tempResidentDocument;
    
    if(this.indexSelectedDocument != undefined){
      tempResidentDocument  = Object.assign({}, this.residentDocument);
      this.residentDocumentList[this.indexSelectedDocument] = tempResidentDocument;
      
      this.residentService.UpdateResidentDocumentById(tempResidentDocument, this.idSelectedDocument)
      .then(()=>{
        this.residentService.GetResidentDocumentsById(this.residentId)
        .then((residentDocumentList)=>{
          this.residentDocumentList = residentDocumentList;

        })
      })
    }else{
      this.residentDocument.residentId = this.residentId;
      tempResidentDocument  = Object.assign({}, this.residentDocument);
      this.residentDocumentList.push(tempResidentDocument);
      
      this.residentService.CreateNewResidentDocument(tempResidentDocument)
      .then((response)=>{
        console.log(response);
        this.residentService.GetResidentDocumentsById(this.residentId)
        .then(residentDocumentList =>{
          this.residentDocumentList = residentDocumentList;
        })
      })
      
    }

    this.residentDocument.releaseDate = '';
    this.residentDocument.expirationDate = '';
    this.residentDocument.issuingCountry = '';
    this.residentDocument.typeDocument = '';
    this.residentDocument.documentTypeId = 0;
    this.residentDocument.residentId = this.residentId;

    this.selectedTypeDocument = [];

    if(this.showDocumentForm){
      this.showDocumentForm = false;
      this.showEditDocumentButton = false;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
  }

  EditDocument(index, documentId){
    
    
    this.showEditDocumentButton = true;
    this.indexSelectedDocument = index;
    this.idSelectedDocument = documentId;

    if(!this.showDocumentForm){
      this.showDocumentForm = true;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }

    this.residentDocument.releaseDate = this.residentDocumentList[index].release_date;
    this.residentDocument.expirationDate = this.residentDocumentList[index].expiration_date;
    this.residentDocument.issuingCountry = this.residentDocumentList[index].issuing_country;
    this.residentDocument.typeDocument = this.residentDocumentList[index].type_document;
    this.residentDocument.documentTypeId = this.residentDocumentList[index].document_type_id;
    this.residentDocument.residentId = this.residentId;

    this.selectedTypeDocument.push(this.residentDocument.documentTypeId);


  }

  DeleteDocument(index, documentId){
    this.residentDocumentList.splice(index, 1);
    this.residentService.DeleteResidentDocumentById(documentId)
    .then(()=>{
    })
  }
    
  GoBackToDocumentTable(){

    this.showEditDocumentButton = false;
    this.selectedTypeDocument = [];

    if(this.showDocumentForm){
      this.showDocumentForm = false;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }

    this.residentDocument.releaseDate = '';
    this.residentDocument.expirationDate = '';
    this.residentDocument.issuingCountry = '';
    this.residentDocument.typeDocument = '';
    this.residentDocument.documentTypeId = 0;
    this.residentDocument.residentId = this.residentId;

    this.selectedTypeDocument = [];
  }

}
