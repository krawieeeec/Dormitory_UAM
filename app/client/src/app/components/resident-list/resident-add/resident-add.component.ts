import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident/resident.service';
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

    
  }

  ngOnInit() {
    this.dormitoryId = this.userSessionService.GetChosenDormitoryId();
    console.log(this.dormitoryId);
  }

  ngDoCheck(){
  }

  ngOnChanges(){
  
  }

  GetResidentPersonalData(residentPersonalData){
    this.residentPersonalData = residentPersonalData;
    // console.log(this.residentPersonalData);
    // console.log('resident-personal-data');
  }

  GetResidentAddress(residentAddressList){
    this.residentAddressList = residentAddressList;
    // console.log(this.residentAddressList);
    // console.log('resident-edit-address');
 
  }
  
  GetResidentDocument(residentDocumentList){
    this.residentDocumentList = residentDocumentList;
    // console.log(this.residentDocumentList);
    // console.log('resident-edit-document');
  
  }

  GetResidentDormitory(residentDormitory){
    this.residentDormitory = residentDormitory;
    // console.log(this.residentDormitory);
    // console.log('resident-edit-dormitory');
  }

  GoBack():void{
    //this.location.back();
    this.router.navigate(['residentList', this.dormitoryId]);
 
  }

  CreateNewResident():void{
    
    console.log(this.residentPersonalData);
    this.residentService.CreateNewResidentPersonalData(this.residentPersonalData)
    .then(newResident =>{
      console.log(newResident);
      this.residentId = newResident.id;
      this.residentAddressList.forEach(element => {
        element.resident_id = this.residentId;
      });

      this.residentDocumentList.forEach(element => {
        element.resident_id = this.residentId;
      });
      
      // console.log(this.residentAddressList);
      // console.log(this.residentDocumentList);
      

      this.residentService.CreateNewResidentAddress(this.residentAddressList)
      .then((newResidentAddress) =>{
        console.log(newResidentAddress);
      })

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
    })
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
      console.log(this.showResidentAddForm);
    }
  }

  ShowResidentSearch(){
    if(!this.showResidentSearch){
      this.showResidentSearch = true;
      this.showResidentAddForm = false;
      console.log(this.showResidentAddForm);
    }
  }
  

}
