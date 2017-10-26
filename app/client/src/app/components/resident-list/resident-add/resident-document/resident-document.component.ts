import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  DoCheck,
  Input
} from '@angular/core';

import {NgModel} from '@angular/forms';

import {ResidentService} from '../../../../shared/resident/resident.service';
import {TypeDocumentService} from '../../../../shared/type-document/type-document.service';

import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'resident-document', 
  templateUrl: './resident-document.component.html', 
  styleUrls: ['./resident-document.component.css']
})
export class ResidentDocumentComponent implements OnInit, OnChanges, DoCheck {

  private typeDocumentList : IMultiSelectOption[];
  private tempTypeDocumentList : IMultiSelectOption[];
  private settingsSelectButton : IMultiSelectSettings;
  private settingsTextSelectButton : IMultiSelectTexts;
  private selectedTypeDocument;
  private previousSelectedTypeDocument;
  
  private residentDocument;
  private showDocumentForm;
  private residentDocumentList;
  private showEditDocumentButton;
  private indexSelectedDocument;
  private residentId;

  @Output()emitResidentDocumentList;
  @Output()emitIsResidentDocumentTableOpen;
  @Input() getResidentDocumentList: Array<any>;
  @Input() getResidentId;


  constructor(
    private residentService : ResidentService, 
    private typeDocumentService : TypeDocumentService
  ) {  
      this.residentDocument = {
      releaseDate: '',
      serialNumber: '',
      expirationDate: '',
      issuingCountry: '',
      typeDocument: '',
      isUsed: false,
      isNew: false,
      isUpdated: false,
      document_type_id: 0,
      resident_id: 0,
    }

    this.settingsSelectButton = {
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

    this.emitResidentDocumentList = new EventEmitter < any > ();
    this.emitIsResidentDocumentTableOpen = new EventEmitter < boolean > ();

    this.typeDocumentList = [];
    this.tempTypeDocumentList = [];
    this.selectedTypeDocument = [];
    this.previousSelectedTypeDocument = 0;
    this.showDocumentForm = false;
    this.residentDocumentList = [];
    this.showEditDocumentButton = false;
    this.indexSelectedDocument = 0;
    this.getResidentId = 0;
    this.residentId = 0;
  }

  ngOnInit() {
    this
      .typeDocumentService
      .GetAllTypeDocuments()
      .then(typeDocuments => {
        typeDocuments.forEach((element, index) => {
          this.tempTypeDocumentList.push({id: element.id, name: element.typeDocument})
        });
        this.typeDocumentList = this.tempTypeDocumentList;
      })
  }

  ngOnChanges() {

    if(this.getResidentId != 0){
      this.residentId = this.getResidentId;
    }

    this.residentDocumentList = [];
    this.residentDocumentList = this.getResidentDocumentList;    
    this.residentDocumentList.forEach(element => {
      element.isUsed = false;
      element.isNew = false;
      element.isUpdated = false;
    });
  }  

  ngDoCheck() {
    this.emitResidentDocumentList.emit(this.residentDocumentList);

    if (this.selectedTypeDocument.length > 0 && (this.previousSelectedTypeDocument != this.selectedTypeDocument[0])) {
      this.typeDocumentList.forEach(element => {
          if (element.id == this.selectedTypeDocument[0]) {
            this.residentDocument.document_type_id = element.id;
            this.residentDocument.typeDocument = element.name;
          }
        });
      this.previousSelectedTypeDocument = this.selectedTypeDocument[0];
    };
  }

  AddNewDocument() {
    if (!this.showDocumentForm) {
      this.showDocumentForm = true;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
    this.indexSelectedDocument = undefined;
  }

  GoBackToDocumentTable() {

    this.showEditDocumentButton = false;
    this.selectedTypeDocument = [];

    if (this.showDocumentForm) {
      this.showDocumentForm = false;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }

    this.ClearResidentDocumentModel();
  }

  SaveDocument() {
    let newResidentDocument;
    
    if (this.indexSelectedDocument != undefined) {
      this.residentDocument.isUpdated = true;
      newResidentDocument = Object.assign({}, this.residentDocument);
      this.residentDocumentList[this.indexSelectedDocument] = newResidentDocument;
      if(
        (this.residentDocumentList[this.indexSelectedDocument].isNew == false || this.residentDocumentList[this.indexSelectedDocument].isNew == true) &&
        (this.residentDocumentList[this.indexSelectedDocument].isUpdated == true) &&
        (this.residentDocumentList[this.indexSelectedDocument].isUsed == true || this.residentDocumentList[this.indexSelectedDocument].isUsed == false)
      ){
        this.residentService.UpdateResidentDocumentById(this.residentDocumentList[this.indexSelectedDocument],
        this.residentDocumentList[this.indexSelectedDocument].id)
        .then(response => {
          if(response.isUpdated){
            console.log('zaktualizowano dokument');         
          }else{
            console.log(response.errorMessage);
          }
        })
      } 
    }else {
      if(this.getResidentId == 0){
        this.residentDocument.isNew = true;
        newResidentDocument = Object.assign({}, this.residentDocument);
        this.residentDocumentList.push(newResidentDocument); 
      }else{
        this.residentDocument.isNew = true;
        newResidentDocument = Object.assign({}, this.residentDocument);
        newResidentDocument.resident_id = this.getResidentId;
        this.residentService.CreateNewResidentDocument([newResidentDocument])
        .then(response =>{
          if(response.isCreated){
            console.log('utworzno dokument');
            newResidentDocument.id = response.newResidentDocuments[0].id;
            this.residentDocumentList.push(newResidentDocument);
          }else{
            console.log(response.errorMessage);
          }
        })
      
      }
      
      
      
    }

    this.ClearResidentDocumentModel();

    if (this.showDocumentForm) {
      this.showDocumentForm = false;
      this.showEditDocumentButton = false;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
    
  }

  EditDocument(index) {
    this.showEditDocumentButton = true;
    this.indexSelectedDocument = index;

    if (!this.showDocumentForm) {
      this.showDocumentForm = true;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
    this.residentDocument.id = this.residentDocumentList[index].id;
    this.residentDocument.releaseDate = this.residentDocumentList[index].releaseDate;
    this.residentDocument.serialNumber = this.residentDocumentList[index].serialNumber;
    this.residentDocument.expirationDate = this.residentDocumentList[index].expirationDate;
    this.residentDocument.issuingCountry = this.residentDocumentList[index].issuingCountry;
    this.residentDocument.typeDocument = this.residentDocumentList[index].typeDocument;
    this.residentDocument.isUsed = this.residentDocumentList[index].isUsed;
    this.residentDocument.isNew = this.residentDocumentList[index].isNew;
    this.residentDocument.isUpdated = this.residentDocumentList[index].isUpdated;
    this.residentDocument.document_type_id = this.residentDocumentList[index].document_type_id;
    this.residentDocument.resident_id = this.residentDocumentList[index].resident_id;

    this.selectedTypeDocument.push(this.residentDocument.document_type_id);

  }
  UseDocument(index){
    
    if(this.residentDocumentList[index].isUsed == false){
        
      this.residentDocumentList.forEach(element => {
        if(element.isUsed){
          element.isUsed = false;
        }  
      });
      this.residentDocumentList[index].isUsed = true
    }else{
      this.residentDocumentList[index].isUsed = false
    }
  }

  ClearResidentDocumentModel(){

    this.residentDocument.releaseDate = '';
    this.residentDocument.serialNumber = '';
    this.residentDocument.expirationDate = '';
    this.residentDocument.issuingCountry = '';
    this.residentDocument.typeDocument = '';
    this.residentDocument.isUsed = false;
    this.residentDocument.isNew = false;
    this.residentDocument.isUpdated = false;
    this.residentDocument.document_type_id = 0;

    this.selectedTypeDocument = [];
    this.previousSelectedTypeDocument = '';
    
  }
}
