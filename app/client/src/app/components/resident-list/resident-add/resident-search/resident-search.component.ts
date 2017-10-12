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
  private residentPeronalData;
  private residentAddress;
  private residentDocument;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location,
    private residentService: ResidentService,
    private userSessionService: UserSessionService,
    private dialogService: DialogService
  ) 
  { 
    this.residentPeronalData = {
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
      citzenship_code_id: 0
    }
    this.residentAddress = {
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      postCode: '',
      address: '',
      address_type_id: 0,
    }
    this.residentDocument = {
      releaseDate: '',
      expirationDate: '',
      issuingCountry: '',
      typeDocument: '',
      document_type_id: 0,
      resident_id: 0
    }
    this.residentSearchedAttributes = {
      name: '',
      surname: '',
      pesel: '',
      dormitoryId: 0
    }
    this.searchedResidentsList = [];
    this.searchedResidentsListLength = 0;
  }

  ngOnInit() {
    this.residentSearchedAttributes.dormitoryId = this.userSessionService.GetChosenDormitoryId();
  }

  ngDoCheck(){
  }

  ngOnChanges(){
  
  }

  ShowModal(residentId) {
    console.log(residentId);
    this.residentService.GetResidentPersonalDataById(residentId)
    .then(residentPersonalData =>{
      this.residentPeronalData.name = residentPersonalData[0].name;
      this.residentPeronalData.surname = residentPersonalData[0].surname;
      this.residentPeronalData.genre = residentPersonalData[0].genre;
      this.residentPeronalData.birthDate = residentPersonalData[0].birth_date;
      this.residentPeronalData.birthPlace = residentPersonalData[0].birth_place;
      this.residentPeronalData.motherName = residentPersonalData[0].mother_name;
      this.residentPeronalData.fatherName = residentPersonalData[0].father_name;
      this.residentPeronalData.pesel = residentPersonalData[0].pesel;
      this.residentPeronalData.citzenship = residentPersonalData[0].citzenship;
      this.residentPeronalData.phoneNumber = residentPersonalData[0].phone_number;
      console.log(this.residentPeronalData);

      this.residentService.GetResidentAddressById(residentId)
      .then(residentAddress =>{
        console.log(residentAddress);
        this.residentAddress.country = residentAddress[0].country;
        this.residentAddress.city = residentAddress[0].city;
        this.residentAddress.street = residentAddress[0].street;
        this.residentAddress.houseNumber = residentAddress[0].house_number;
        this.residentAddress.apartmentNumber = residentAddress[0].apartment_number;
        this.residentAddress.postCode = residentAddress[0].post_code;
        this.residentAddress.address = residentAddress[0].address;
        console.log(this.residentAddress);

        this.residentService.GetResidentDocumentsById(residentId)
        .then(residentDocument =>{
          this.residentDocument.releaseDate = residentDocument.release_date;
          this.residentDocument.expirationDate = residentDocument.expiration_date;
          this.residentDocument.issuingCountry = residentDocument.issuing_country;
          this.residentDocument.typeDocument = residentDocument.type_document;

          console.log(this.residentAddress);
          let disposable = this.dialogService.addDialog(AppModalComponent, {
            title:'Szczegóły rezydenta', 
            residentPersonalData: this.residentPeronalData,
            residentAddress: this.residentAddress,
            residentDocument: this.residentDocument  
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
    .then(searchedResidents =>{
      this.searchedResidentsList = searchedResidents;
      this.searchedResidentsListLength = this.searchedResidentsList.length; 
    })
  }
 

  

}
