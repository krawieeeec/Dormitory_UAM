import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident/resident.service';
import { TypeAddressService } from '../../../shared/type-address/type-address.service';
import { UserSessionService } from '../../../shared/user-session.service';
import { ResidentAccountService } from '../../../shared/resident-account/resident-account.service';
import { ResidentListService } from '../services/resident-list.serivce';

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
  private residentIdFromSearchResident;
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
    private typeAddressService: TypeAddressService,
    private residentAccountService: ResidentAccountService,
    private residentListService: ResidentListService 
  ) 
  { 
    this.residentId = 0;
    this.dormitoryId = 0;
    this.documentId = 0;
    this.residentIdFromSearchResident = 0;
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
    this.residentIdFromSearchResident = this.residentPersonalDataFromSearchResident.id;
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
    let newResidentAddressesList = [];
    let newResidentDocumentsList = [];
    let residentAccount = {
      UID: null, 
      password: null, 
      validityAccountDate: null,
      accountState: 'Odblokowany', 
      resident_id: 0, 
      stay_resident_id: 0, 
      dormitory_id: 0
    }
    let residentDocumentId = 0;
    let residentAddressIds = {
      tempIdAddress: 0,
      regularIdAddress: 0
    };
    
    console.log(this.residentPersonalData);
    // console.log(this.residentAddressList); 
    // console.log(this.residentDocumentList);
    // console.log(this.residentDormitory);
    if(this.residentPersonalData.isExist){

      this.residentService.UpdateResidentPersonalDataById(this.residentPersonalData, this.residentPersonalData.id)
      .then(response =>{
        if(response.isUpdated){
          console.log('zaaktulizowana dane personalne rezydenta');
          console.log(response);
          this.residentId = response.updatedResident[0].id;
          this.residentAddressList.forEach(element => {
            if(element.isUsed){
              if(element.address == "Stały"){
                residentAddressIds.regularIdAddress = element.id;
              }else{
                residentAddressIds.tempIdAddress = element.id;
              }
            }
          });

          this.residentDocumentList.forEach(element => {
            if(element.isUsed){
              residentDocumentId = element.id;
            }
          });
          if(residentAddressIds.tempIdAddress != 0){
            this.residentDormitory.temp_address_id = residentAddressIds.tempIdAddress;
          }
          if(residentAddressIds.regularIdAddress != 0){
            this.residentDormitory.regular_address_id = residentAddressIds.regularIdAddress;
          }
          this.residentDormitory.document_id = residentDocumentId;
          this.residentService.CreateNewResidentDormitoryStay(this.residentDormitory)
          .then(response => {
            if(response.isCreated){
              console.log('utworzono pobyt dla istniejącego rezydenta');
              console.log(response);
              if(this.residentPersonalData.genre == "Mężczyzna"){
                residentAccount.accountState = "Odblokowany";
              }else{
                residentAccount.accountState = "Odblokowana";
              }
              residentAccount.resident_id = this.residentId;
              residentAccount.dormitory_id = this.dormitoryId;
              residentAccount.stay_resident_id = response.newResidentStay[0].id;
              this.residentAccountService.CreateNewResidentAccount(residentAccount)
              .then(response => {
                if(response.isCreated){
                  console.log('utworzono konto dla istniejącego rezydenta');
                  this.residentListService.SetResidentListObservable$(true);
                  this.router.navigate(['residentList', this.dormitoryId]);
                }else{
                  console.log(response.errorMessage);
                }
              })
            }else{
              console.log(response);
            }

          })
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
          if(element.isUsed){
            element.resident_id = this.residentId;
            newResidentAddressesList.push(element);
          }
          if((element.isNew == true) && (element.isUsed == false)){
            element.resident_id = this.residentId;
            this.residentService.CreateNewResidentAddress([element])
            .then(response => {
              if(response.isCreated){
                console.log('utworzono adres ale nie wybrany dla nowego rezydenta');
              }
            })
          }  
        });

        this.residentDocumentList.forEach(element => {
          if(element.isUsed){
            element.resident_id = this.residentId;
            newResidentDocumentsList.push(element);
          }
          if((element.isNew == true) && (element.isUsed == false)){
            element.resident_id = this.residentId;
            this.residentService.CreateNewResidentDocument([element])
            .then(response => {
              if(response.isCreated){
                console.log('utworzono dokument ale nie wybrany dla nowego rezydenta');
              }else{
                console.log(response);
              }
            })
          }
        });
        
        if(newResidentAddressesList.length > 0 && newResidentDocumentsList.length > 0){
          this.residentService.CreateNewResidentAddress(newResidentAddressesList)
          .then(response => {
            if(response.isCreated){
              console.log('utworzono nowy adres dla nowego rezyednta')
              response.newResidentAddresses.forEach(element => {
                if(element.address_type_id == 1){
                  residentAddressIds.regularIdAddress = element.id;
                }else{
                  residentAddressIds.tempIdAddress = element.id;
                }
              });
              this.residentService.CreateNewResidentDocument(newResidentDocumentsList)
              .then(response => {
                if(response.isCreated){
                  console.log('utworzono nowy dokument dla nowego rezydenta');
                  residentDocumentId = response.newResidentDocuments[0].id;
                  
                  if(residentAddressIds.tempIdAddress != 0){
                    this.residentDormitory.temp_address_id = residentAddressIds.tempIdAddress;
                  }
                  if(residentAddressIds.regularIdAddress != 0){
                    this.residentDormitory.regular_address_id = residentAddressIds.regularIdAddress;
                  }
                  
                  this.residentDormitory.document_id = residentDocumentId;
                  this.residentDormitory.resident_id = this.residentId;
                  this.residentService.CreateNewResidentDormitoryStay(this.residentDormitory)
                  .then(response => {
                    if(response.isCreated){
                      console.log('utworzono pobyt dla nowego rezydenta');
                      residentAccount.resident_id = this.residentId;
                      residentAccount.dormitory_id = this.dormitoryId;
                      residentAccount.stay_resident_id = response.newResidentStay[0].id;
                      this.residentAccountService.CreateNewResidentAccount(residentAccount)
                      .then(response => {
                        if(response.isCreated){
                          console.log('utworzono konto dla nowego rezydenta');
                          this.residentListService.SetResidentListObservable$(true);
                          this.router.navigate(['residentList', this.dormitoryId]);
                        }else{
                          console.log(response.errorMessage);
                        }
                      })
                      console.log(response);
                    }else{
                      console.log(response);
                    }
        
                  })      
                }else{
                  console.log(response);
                }
                
              })
  
            }
          })
         
          }
      }else{
        
        console.log(response.errorMessage);
      }
    })
  }
   
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
