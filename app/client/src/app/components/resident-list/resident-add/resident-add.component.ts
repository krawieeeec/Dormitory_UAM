import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident/resident.service';
import { UserSessionService } from '../../../shared/user-session.service';


@Component({
  selector: 'add-resident',
  templateUrl: './resident-add.component.html',
  styleUrls: ['./resident-add.component.css']
})

export class ResidentAddComponent implements OnInit, DoCheck, OnChanges {


  private residentPersonalData;
  private residentAddress;
  private residentDocument;
  private residentDormitory;
  private residentId;
  private dormitoryId;
  private documentId;
  private showAddButtons;
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

  GetResidentAddress(residentAddress){
    this.residentAddress = residentAddress;
    // console.log(this.residentAddress);
    // console.log('resident-edit-address');
  }
  
  GetResidentDocument(residentDocument){
    this.residentDocument = residentDocument;
    // console.log(this.residentDocument);
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
    this.residentService.CreateNewResidentPersonalData(this.residentPersonalData)
    .then(newResident =>{
      console.log(newResident); 
      this.residentId = newResident.id;
      console.log(this.residentId);
      this.residentAddress.residentId = this.residentId;
      this.residentDocument.residentId = this.residentId;

      this.residentService.CreateNewResidentAddress(this.residentAddress)
      .then((newResidentAddress) =>{
      })

      this.residentService.CreateNewResidentDocument(this.residentDocument)
      .then(newResidentDocument =>{
        this.documentId = newResidentDocument.document_type_id;      
        this.residentDormitory.documentId = this.documentId;
        this.residentDormitory.residentId = this.residentId;

        this.residentService.CreateNewResidentDormitoryStay(this.residentDormitory)
        .then(newResidentDormitoryStay => {
          this.router.navigate(['residentList', this.dormitoryId]);
          // location.reload();
        })
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
    console.log('jestem');
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

}
