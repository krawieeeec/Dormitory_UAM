import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident/resident.service';
import { TypeAddressService } from '../../../shared/type-address/type-address.service';
import { UserSessionService } from '../../../shared/user-session.service';


@Component({
  selector: 'resident-add',
  templateUrl: './resident-add.component.html',
  styleUrls: ['./resident-add.component.css']
})

export class ResidentAddComponent implements OnInit, DoCheck, OnChanges {


  private residentPersonalData;
  private residentAddressList;
  private residentDocumentList;
  private residentDormitory;
  private residentPersonalDataFromSearchResident;
  private residentAddressListFromSearchResident;
  private residentDocumentListFromSearchResident;
  private residentId;
  private dormitoryId;
  private documentId;
  private showAddButtons;
  private showResidentAddForm;
  private showResidentSearch;
  private isResidentAddressTableOpen;
  private isResidentDocumentTableOpen;
  

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location, 
    private residentService: ResidentService, 
    private userSessionService: UserSessionService,
    private typeAddressService: TypeAddressService 
  ) 
  { 
    this.residentId = 0;
    this.dormitoryId = 0;
    this.documentId = 0;
    this.showResidentAddForm = true;
    this.showResidentSearch = false;
    this.showAddButtons = true;
    this.isResidentAddressTableOpen = true;
    this.isResidentDocumentTableOpen = true;
    this.residentAddressListFromSearchResident = [];
    this.residentDocumentListFromSearchResident = [];

    this.residentPersonalDataFromSearchResident = {
      id: '',
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
      serialNumber: '',
      isExist: false,
      citzenshipCodeId: 0
    }
  }

  ngOnInit() {
    this.dormitoryId = this.userSessionService.GetChosenDormitoryId();
  }

  ngDoCheck(){
  }

  ngOnChanges(){
  }

  GetResidentPersonalData(residentPersonalData){
    this.residentPersonalData = residentPersonalData;
  }

  GetResidentAddress(residentAddressList){
    this.residentAddressList = residentAddressList;
  }
  
  GetResidentDocument(residentDocumentList){
    this.residentDocumentList = residentDocumentList;
  }

  GetResidentDormitory(residentDormitory){
    this.residentDormitory = residentDormitory;
  }
  GetResidentPersonalDataFromSearchResident(residentPersonalData){    
    this.residentPersonalDataFromSearchResident = residentPersonalData;
  }
  GetResidentAddressListFromSearchResident(residentAddressList){
    this.residentAddressListFromSearchResident = residentAddressList;
  }
  GetResidentDocumentListFromSearchResident(residentDocumentList){
    this.residentDocumentListFromSearchResident = residentDocumentList;
  }

  GetShowResidentSearch(showResidentSearch){
    this.showResidentSearch = showResidentSearch;
  }
  GetShowResidentAddForm(showResidentAddForm){
    this.showResidentAddForm = showResidentAddForm;
  }

  GoBack():void{
    //this.location.back();
    this.router.navigate(['residentList', this.dormitoryId]);
 
  }

  CreateNewResident():void{
    
    let residentNewAddressesList = [];
    let residentAddressIds = {
      tempIdAddress: 0,
      regularIdAddress: 0
    };
    let residentDocumentIdsList = [];
    let totalAmountAddresses = 0;
    
    // console.log(this.residentAddressList); 
    // console.log(this.residentDocumentList);
    console.log(this.residentPersonalData);
    if(this.residentPersonalData.isExist){

      this.residentService.UpdateResidentPersonalDataById(this.residentPersonalData, this.residentPersonalData.id)
      .then(response =>{
        if(response.isUpdated){
          
          this.residentAddressList.forEach(element => {
           
            if((element.isNew == true) && (element.isUsed == true)){
              residentNewAddressesList.push(element);
              totalAmountAddresses++;
            }
          });
          
          if(residentNewAddressesList.length < 2){
            let residentAddress;
            this.residentAddressList.forEach(element => {
              if((element.isNew == false) && (element.isUpdated == true) && (element.isUsed == true)){
                if(element.address == "Stały"){
                  residentAddressIds.regularIdAddress = element.id;
                  totalAmountAddresses++;
                }else{
                  residentAddressIds.tempIdAddress = element.id;
                  totalAmountAddresses++;
                }
              }
            });
          }
          if(totalAmountAddresses < 2){
            this.residentAddressList.forEach(element => {
              if((element.isNew == false) && (element.isUpdated == false) && (element.isUsed == true)){
                if(element.address == "Stały"){
                  residentAddressIds.regularIdAddress = element.id;
                }else{
                  residentAddressIds.tempIdAddress = element.id;
                }
             }
            });
          }       
          if(residentNewAddressesList.length > 0){
            residentNewAddressesList.forEach(element => {
              element.resident_id = this.residentPersonalData.id;
            });
            this.residentService.CreateNewResidentAddress(residentNewAddressesList) 
            .then(response =>{
              if(response.isCreated){
                response.newResidentAddresses.forEach(element => {
                  if(element.address_type_id == 1){
                    residentAddressIds.regularIdAddress = element.id;
                  }else{
                    residentAddressIds.tempIdAddress = element.id;
                  }   
                });
              }  
            })
          }
          //place for documents
        }else{
          console.log(response.errorMessage);
        }
      })
  }else{
    this.residentService.CreateNewResidentPersonalData(this.residentPersonalData)
    .then(response =>{
      if(response.isCreated){
        this.residentId = response.newResident[0].id;
        
        this.residentAddressList.forEach(element => {
          
           if((element.isNew == true) && (element.isUsed == true)){
             residentNewAddressesList.push(element);
             totalAmountAddresses++;
           }
         });
         
         if(residentNewAddressesList.length < 2){
           let residentAddress;
           this.residentAddressList.forEach(element => {
             if((element.isNew == false) && (element.isUpdated == true) && (element.isUsed == true)){
               if(element.address == "Stały"){
                 residentAddressIds.regularIdAddress = element.id;
                 totalAmountAddresses++;
               }else{
                 residentAddressIds.tempIdAddress = element.id;
                 totalAmountAddresses++;
               }
             }
           });
         }
         if(totalAmountAddresses < 2){
           this.residentAddressList.forEach(element => {
             if((element.isNew == false) && (element.isUpdated == false) && (element.isUsed == true)){
               if(element.address == "Stały"){
                 residentAddressIds.regularIdAddress = element.id;
               }else{
                 residentAddressIds.tempIdAddress = element.id;
               }
            }
           });
         }       
         if(residentNewAddressesList.length > 0){
           residentNewAddressesList.forEach(element => {
             element.resident_id = this.residentId;
           });
           this.residentService.CreateNewResidentAddress(residentNewAddressesList) 
           .then(response =>{
             if(response.isCreated){
               response.newResidentAddresses.forEach(element => {
                 if(element.address_type_id == 1){
                   residentAddressIds.regularIdAddress = element.id;
                 }else{
                   residentAddressIds.tempIdAddress = element.id;
                 }   
               });
               
             }  
           })
         }
        //place for documents
      }else{
        console.log(response.errorMessage);
      }

    })
       
  }
 
      // console.log(this.residentAddressList);
      // console.log(this.residentDocumentList);
      
/*
      this.residentService.CreateNewResidentDocument(this.residentDocumentList)
      .then(newResidentDocument =>{
        // console.log(newResidentDocument);
        // this.documentId = newResidentDocument;      
        // this.residentDormitory.documentId = this.documentId;
        // this.residentDormitory.residentId = this.residentId;

        // this.residentService.CreateNewResidentDormitoryStay(this.residentDormitory)
        // .then(newResidentDormitoryStay => {
        //   this.router.navigate(['residentList', this.dormitoryId]);
        //   location.reload();
        // })
      })
      */
  }

  GetIsResidentAddressTableOpen(isResidentAddressTableOpen){
    this.isResidentAddressTableOpen = isResidentAddressTableOpen;
    if(this.isResidentAddressTableOpen){
      this.showAddButtons = true;
    } else if(!this.isResidentAddressTableOpen){
      this.showAddButtons = false;
    }
  }

  GetIsResidentDocumentTableOpen(isResidentDocumentTableOpen){
    this.isResidentDocumentTableOpen = isResidentDocumentTableOpen;
    if(this.isResidentDocumentTableOpen){
      this.showAddButtons = true;
    } else if(!this.isResidentDocumentTableOpen){
      this.showAddButtons = false;
    }
  }

  CheckResidentTable(isResidentAddressTabOpen, isResidentDocumentTabOpen){
      if((isResidentAddressTabOpen == false) && (isResidentDocumentTabOpen == false)){
        if(this.isResidentAddressTableOpen){
          this.showAddButtons = true;
        } else if(!this.isResidentAddressTableOpen ){
          this.showAddButtons = true;
        }
      }
      
      if(isResidentAddressTabOpen == true){
        if(this.isResidentAddressTableOpen){
          this.showAddButtons = true;
        } else{
          this.showAddButtons = false;
        }
      }

      if(isResidentDocumentTabOpen == true){
        if(this.isResidentDocumentTableOpen){
          this.showAddButtons = true;
        } else{
          this.showAddButtons = false;
        }
      }
  }

  ShowResidentAddForm(){
    if (!this.showResidentAddForm){
      this.showResidentAddForm = true;
      this.showResidentSearch = false;
     
    }
  }

  ShowResidentSearch(){
    if(!this.showResidentSearch){
      this.showResidentSearch = true;
      this.showResidentAddForm = false;
     
    }
  }
  

}
