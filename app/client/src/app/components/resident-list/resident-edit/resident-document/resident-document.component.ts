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
  private showEditDocumentButton;
  private selectedDocument;

  
  @Input() residentId:number;
  @Input() stayResidentId: number;
  @Output() emitResidentDocumentList;
  @Output() emitIsResidentDocumentTableOpen

  constructor(
    private residentService: ResidentService,
    private typeDocumentService : TypeDocumentService
  ) {
    this.residentDocument = {
      serialNumber: '',
      releaseDate: '',
      expirationDate: '',
      issuingCountry: '',
      typeDocument: '',
      document_type_id: 0,
      resident_id: 0
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
    this.emitResidentDocumentList = new EventEmitter<any>();
    this.emitIsResidentDocumentTableOpen = new EventEmitter<boolean>();

    this.typeDocumentList = [];
    this.tempTypeDocumentList = [];
    this.selectedTypeDocument = [];
    this.residentDocumentList = [];
    
    this.showDocumentForm = false;
    this.showEditDocumentButton = false;
    this.previousSelectedTypeDocument = 0;
    this.indexSelectedDocument = 0;
  }

  ngOnInit() {

    this.residentService.GetResidentStayById(this.stayResidentId)
    .then(response => {
      console.log(response.stayResident);
      this.selectedDocument = response.stayResident.document_id;
    })
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
        console.log(residentDocuments);
        this.residentDocumentList = residentDocuments;
        this.residentDocumentList.forEach(element => {
          element.isNew = false;
          element.isUpdated = false;
          if(element.id == this.selectedDocument){
            console.log('resident Document!');
            console.log(this.selectedDocument);
            console.log(element.id);
            element.isUsed = true;
          }else{
            element.isUsed = false;
          }          
        });
        this.emitResidentDocumentList.emit(this.residentDocumentList);
      })
    })
  
  }
  

  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentDocumentList.emit(this.residentDocumentList);

    if(this.selectedTypeDocument.length > 0 && (this.previousSelectedTypeDocument != this.selectedTypeDocument[0])){
      this.typeDocumentList.forEach(element => {
        if(element.id == this.selectedTypeDocument[0]){
           this.residentDocument.document_type_id = element.id;
           this.residentDocument.typeDocument = element.name;
           console.log(this.residentDocument);
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
      
      this.residentService.UpdateResidentDocumentById(tempResidentDocument)
      .then((response)=>{
        console.log('zaaktualizowano dokument');
        console.log(response);
        this.residentDocumentList[this.indexSelectedDocument].isUpdated = true;
        this.emitResidentDocumentList.emit(this.residentDocumentList);
      })
      .catch(response => {
        console.log(response.errorMessage);
      })
    }else{
      this.residentDocument.resident_id = this.residentId;
      tempResidentDocument  = Object.assign({}, this.residentDocument);
      
      
      this.residentService.CreateNewResidentDocument([tempResidentDocument])
      .then((response)=>{
        if(response.isCreated){
          console.log('utworzono nowy dokument');
          response.newResidentDocuments[0].typeDocument = tempResidentDocument.typeDocument;
          response.newResidentDocuments[0].isUpdated = true;
          response.newResidentDocuments[0].isUpdated = false;
          response.newResidentDocuments[0].isUsed = false;
          this.residentDocumentList.push(response.newResidentDocuments[0]);
          this.emitResidentDocumentList.emit(this.residentDocumentList);
        }  
      })
      .catch(response => {
        console.log(response.errorMessage);
      })
      
    }

    this.ClearResidentDocumentModel();

    if(this.showDocumentForm){
      this.showDocumentForm = false;
      this.showEditDocumentButton = false;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
  }

  EditDocument(index){
    
    
    this.showEditDocumentButton = true;
    this.indexSelectedDocument = index;

    if(!this.showDocumentForm){
      this.showDocumentForm = true;
      this.emitIsResidentDocumentTableOpen.emit(!this.showDocumentForm);
    }
    
    this.residentDocument.id = this.residentDocumentList[index].id;
    this.residentDocument.releaseDate = this.residentDocumentList[index].releaseDate;
    this.residentDocument.serialNumber = this.residentDocumentList[index].serialNumber;
    this.residentDocument.expirationDate = this.residentDocumentList[index].expirationDate;
    this.residentDocument.issuingCountry = this.residentDocumentList[index].issuingCountry;
    this.residentDocument.typeDocument = this.residentDocumentList[index].typeDocument;
    this.residentDocument.document_type_id = this.residentDocumentList[index].document_type_id;
    this.residentDocument.resident_id = this.residentId;
    this.residentDocument.isNew = this.residentDocumentList[index].isNew;
    this.residentDocument.isUpdated = this.residentDocumentList[index].isUpdated;
    this.residentDocument.isUsed = this.residentDocumentList[index].isUsed;

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

   this.ClearResidentDocumentModel();
  }

  ClearResidentDocumentModel(){
    
    this.residentDocument.releaseDate = '';
    this.residentDocument.expirationDate = '';
    this.residentDocument.issuingCountry = '';
    this.residentDocument.typeDocument = '';
    this.residentDocument.serialNumber = '';
    this.residentDocument.document_type_id = 0;
    this.residentDocument.residentId = this.residentId;
    this.residentDocument.serialNumber = '';
    
    this.selectedTypeDocument = [];
    this.previousSelectedTypeDocument = '';
        
      }

      CheckIsResidentSerialNumberExist(serialNumber){
        let searchedAttributes = {
          pesel: '',
          serialNumber: ''
        }
        if(serialNumber == undefined){
          searchedAttributes.serialNumber = this.residentDocument.serialNumber;
        }else{
          searchedAttributes.serialNumber = serialNumber;
        }
          
          this.residentService.FindExistingResident(searchedAttributes)
          .then(response => {
            if(response.isExist){
              console.log('Dokument w bazie');
            }else{
              console.log('Brak dokumentu');
            }
          })
      }

}
