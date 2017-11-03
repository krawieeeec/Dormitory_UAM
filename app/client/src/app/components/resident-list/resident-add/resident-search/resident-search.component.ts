import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { NgModel } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { AppModalComponent } from '../../../../shared/app-modal/app-modal.component';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { UserSessionService } from '../../../../shared/user-session.service';

@Component({
  selector: 'resident-search',
  templateUrl: './resident-search.component.html',
  styleUrls: ['./resident-search.component.css']
})

export class ResidentSearchComponent implements OnInit, DoCheck, OnChanges {

  private residentSearchedAttributes;
  private searchedResidentsList; 
  private searchedResidentsListLength;
  private residentPersonalData;
  private residentAddressList;
  private residentDocumentList;
  private isForeigner;

  @Output() emitResidentPeronalData;
  @Output() emitResidentAddressList;
  @Output() emitResidentDocumentList;
  @Output() emitShowResidentSearch;
  @Output() emitShowResidentAddForm;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location,
    private residentService: ResidentService,
    private userSessionService: UserSessionService,
    private dialogService: DialogService
  ) 
  { 
    this.residentPersonalData = {
      name: '',
      surname: '',
      genre: '',
      birthDate: '',  
      birthPlace: '',
      motherName: '',
      fatherName: '',
      pesel: '',
      phoneNumber: '',
      citzenship: '',
      isExist: false,
      citzenshipCodeId: 0
    }
    
    this.residentSearchedAttributes = {
      name: '',
      surname: '',
      pesel: '',
      serialNumber: '',
      isForeigner: 'false',
      dormitoryId: 0
    }
    this.searchedResidentsList = [];
    this.residentAddressList = [];
    this.residentDocumentList = [];
    this.searchedResidentsListLength = 0;
    this.isForeigner = false;
    this.emitResidentPeronalData = new EventEmitter <Array<object>>();
    this.emitResidentAddressList = new EventEmitter <Array<object>>();
    this.emitResidentDocumentList = new EventEmitter <Array<object>>();
    this.emitShowResidentSearch = new EventEmitter <boolean>();
    this.emitShowResidentAddForm = new EventEmitter <boolean>();
    }

  ngOnInit() {
    this.residentSearchedAttributes.dormitoryId = this.userSessionService.GetChosenDormitoryId();
  }

  ngDoCheck(){
  }

  ngOnChanges(){
  
  }

  ShowModal(residentId) {
    
    this.residentService.GetResidentPersonalDataById(residentId)
    .then(residentPersonalData =>{
      this.residentPersonalData.name = residentPersonalData[0].name;
      this.residentPersonalData.surname = residentPersonalData[0].surname;
      this.residentPersonalData.genre = residentPersonalData[0].genre;
      this.residentPersonalData.birthDate = residentPersonalData[0].birth_date;
      this.residentPersonalData.birthPlace = residentPersonalData[0].birth_place;
      this.residentPersonalData.motherName = residentPersonalData[0].mother_name;
      this.residentPersonalData.fatherName = residentPersonalData[0].father_name;
      this.residentPersonalData.pesel = residentPersonalData[0].pesel;
      this.residentPersonalData.citzenship = residentPersonalData[0].citzenship;
      this.residentPersonalData.phoneNumber = residentPersonalData[0].phone_number;

      this.residentService.GetResidentAddressById(residentId)
      .then(residentAddress =>{
        this.residentAddressList = residentAddress;

        this.residentService.GetResidentDocumentsById(residentId)
        .then(residentDocument =>{
          this.residentDocumentList = residentDocument;

          let disposable = this.dialogService.addDialog(AppModalComponent, {
            title:'Szczegóły rezydenta', 
            residentPersonalData: this.residentPersonalData,
            residentAddress: this.residentAddressList,
            residentDocument: this.residentDocumentList  
          })
            .subscribe((isConfirmed)=>{
                //We get dialog result
                if(isConfirmed) {
                   // alert('accepted');
                }
                else {
                    //alert('declined');
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        // setTimeout(()=>{
        //     disposable.unsubscribe();
        // },10000);
        })
      })
    })
    
}

  FindResidents(){
    this.residentService.SearchResident(this.residentSearchedAttributes)
    .then(response =>{
      if(response.isSearched){
        this.searchedResidentsList = response.searchedResidents;
        console.log(response.searchedResidents);
        this.searchedResidentsListLength = response.searchedResidents.length;  
      }
       
    })
  }
 
  SendResidentToForm(residentId){
    let tempResidentPersonalData;
    this.residentService.GetResidentPersonalDataById(residentId)
    .then(residentPersonalData => {

      this.residentPersonalData.id = residentPersonalData[0].id;
      this.residentPersonalData.name = residentPersonalData[0].name;
      this.residentPersonalData.surname = residentPersonalData[0].surname;
      this.residentPersonalData.genre = residentPersonalData[0].genre;
      this.residentPersonalData.birthDate = residentPersonalData[0].birth_date;
      this.residentPersonalData.birthPlace = residentPersonalData[0].birth_place;
      this.residentPersonalData.motherName = residentPersonalData[0].mother_name;
      this.residentPersonalData.fatherName = residentPersonalData[0].father_name;
      this.residentPersonalData.pesel = residentPersonalData[0].pesel;
      this.residentPersonalData.citzenship = residentPersonalData[0].citzenship;
      this.residentPersonalData.citzenshipCodeId = residentPersonalData[0].citzenship_code_id;
      this.residentPersonalData.phoneNumber = residentPersonalData[0].phone_number;

      tempResidentPersonalData = Object.assign({}, this.residentPersonalData);
      this.emitResidentPeronalData.emit(tempResidentPersonalData);
      
      this.residentService.GetResidentAddressById(residentId)
      .then(residentAddressList =>{

        this.residentAddressList = residentAddressList;
        this.emitResidentAddressList.emit(this.residentAddressList);

        this.residentService.GetResidentDocumentsById(residentId)
        .then(residentDocumentList =>{
              
          this.residentDocumentList = residentDocumentList;
          this.emitResidentDocumentList.emit(this.residentDocumentList);
          this.emitShowResidentSearch.emit(false);
          this.emitShowResidentAddForm.emit(true);
        })
      })
    })
  }
  ClearData(){
    this.residentSearchedAttributes.name = "";
    this.residentSearchedAttributes.surname = "";
    this.residentSearchedAttributes.serialNumber = "";
    this.residentSearchedAttributes.pesel = "";

    this.searchedResidentsList = [];
    this.searchedResidentsListLength = 0;
  }
  

}
