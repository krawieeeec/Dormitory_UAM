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

  @Output()emitResidentDocumentList;
  @Output()emitIsResidentDocumentTableOpen;
  @Input() getResidentDocumentList: Array<any>;

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

    let tempResidentDocument;
    this.residentDocumentList = [];
    
    this.getResidentDocumentList.forEach(element => {

      this.residentDocument.serialNumber = element.serial_number;
      this.residentDocument.issuingCountry = element.issuing_country;
      this.residentDocument.releaseDate = element.release_date;
      this.residentDocument.expirationDate = element.expiration_date;
      this.residentDocument.typeDocument = element.type_document;
      this.residentDocument.document_type_id = element.document_type_id;
      this.residentDocument.resident_id = element.resident_id;
      this.residentDocument.isUsed = false;
      this.residentDocument.isNew = false;
      this.residentDocument.isUpdated = false;

      tempResidentDocument = Object.assign({}, this.residentDocument);
      this.residentDocumentList.push(tempResidentDocument);

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
    let tempResidentDocument;
    
    if (this.indexSelectedDocument != undefined) {
      this.residentDocument.isUpdated = true;
      tempResidentDocument = Object.assign({}, this.residentDocument);
      this.residentDocumentList[this.indexSelectedDocument] = tempResidentDocument;
      console.log(this.residentDocumentList);
    } else {
      this.residentDocument.isNew = true;
      tempResidentDocument = Object.assign({}, this.residentDocument);
      this.residentDocumentList.push(tempResidentDocument);
      console.log(this.residentDocumentList);
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

    this.residentDocument.releaseDate = this.residentDocumentList[index].releaseDate;
    this.residentDocument.serialNumber = this.residentDocumentList[index].serialNumber;
    this.residentDocument.expirationDate = this.residentDocumentList[index].expirationDate;
    this.residentDocument.issuingCountry = this.residentDocumentList[index].issuingCountry;
    this.residentDocument.typeDocument = this.residentDocumentList[index].typeDocument;
    this.residentDocument.isUsed = this.residentDocumentList[index].isUsed;
    this.residentDocument.isNew = this.residentDocumentList[index].isNew;
    this.residentDocument.isUpdated = this.residentDocumentList[index].isUpdated;
    this.residentDocument.document_type_id = this.residentDocumentList[index].document_type_id;

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
