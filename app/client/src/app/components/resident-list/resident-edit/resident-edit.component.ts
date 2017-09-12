import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident/resident.service';
import { UserSessionService } from '../../../shared/user-session.service';


@Component({
  selector: 'resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css']
})

export class ResidentEditComponent implements OnInit, DoCheck, OnChanges {


  private residentPersonalData;
  private residentAddress;
  private residentDocument;
  private residentDormitory;
  private residentId;
  private dormitoryId;
  private switchInputs;
  private showEditButtons
  private isResidentAddressTableOpen;
  private isResidentDocumentTableOpen;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location, 
    private residentService: ResidentService, 
    private userSessionService: UserSessionService, 
  ) { 
    
    this.switchInputs = true;
    this.showEditButtons = true;
    this.isResidentAddressTableOpen = true;
    this.isResidentDocumentTableOpen = true;  
  }

  ngOnInit() {

    this.residentId = this.route.snapshot.params.id;
    this.dormitoryId = this.userSessionService.GetChosenDormitoryId();
    
    
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
    //  console.log(this.residentAddress);
    //  console.log('resident-edit-address');
  }
  
  GetResidentDocument(residentDocument){
    this.residentDocument = residentDocument;
    //  console.log(this.residentDocument);
    //  console.log('resident-edit-document');
  }

  GetResidentDormitory(residentDormitory){
    this.residentDormitory = residentDormitory;
    // console.log(this.residentDormitory);
    // console.log('resident-edit-dormitory');
  }

  // GoBack():void{
  //   //this.location.back();
  //   this.router.navigate(['residentList', this.dormitoryId]);
 
  // }

  SwitchInputs():void{
    if(this.switchInputs){
      this.switchInputs = false;
    }
  }

  EditResident():void{
  //  console.log(this.residentPersonalData);
    this.residentService.UpdateResidentPersonalDataById(this.residentPersonalData, this.residentId)
    .then((response) => {
      // console.log(response);
     // this.router.navigate(['/residentList', this.dormitoryId]);
      console.log('UPDATED - PersonalDATA');
    })
    .catch(error => console.log(error))
    //this.router.navigate(['/residentList', this.dormitoryId]);
    
   // this.updateResidentList$.next(true);
    
    this.residentService.UpdateResidentAddressById(this.residentAddress, this.residentId)
    .then((response) => {
      console.log(response);
      console.log('UPDATED - residentAddress')
    })
    .catch(error => {
      console.log(error);
    })

    this.residentService.UpdateResidentDocumentById(this.residentDocument, this.residentId)
    .then((response) =>{
      // console.log(response);
      console.log('UPDATED - residentDocument');
    })
    .catch(error =>{
      console.log(error);
    })
    this.residentService.UpdateResidentDormitoryById(this.residentDormitory, this.residentId)
    .then((response) =>{
      // console.log(response);
      console.log('UPDATED - residentDormitory');
    })
    
    // location.reload();
  }

  GetIsResidentAddressTableOpen(isResidentAddressTableOpen){
    this.isResidentAddressTableOpen = isResidentAddressTableOpen;
    if(this.isResidentAddressTableOpen){
      this.showEditButtons = true;
    } else if(!this.isResidentAddressTableOpen){
      this.showEditButtons = false;
    }
  }

  GetIsResidentDocumentTableOpen(isResidentDocumentTableOpen){
    
    this.isResidentDocumentTableOpen = isResidentDocumentTableOpen; 
      if(this.isResidentDocumentTableOpen){
        
        this.showEditButtons = true;
      } else if(!this.isResidentDocumentTableOpen){
        
        this.showEditButtons = false;
      }
    }
  

  CheckResidentTable(isResidentAddressTabOpen, isResidentDocumentTabOpen){
    
      if((isResidentAddressTabOpen == false) && (isResidentDocumentTabOpen == false)){
        if(this.isResidentAddressTableOpen){
          this.showEditButtons = true;
        } else if(!this.isResidentAddressTableOpen ){
          this.showEditButtons = true;
        }
      }
      
      if(isResidentAddressTabOpen == true){
        if(this.isResidentAddressTableOpen){
          this.showEditButtons = true;
        } else{
          this.showEditButtons = false;
        }
      }

      if(isResidentDocumentTabOpen == true){
        if(this.isResidentDocumentTableOpen){
          this.showEditButtons = true;
        } else{
          this.showEditButtons = false;
        }
      }
  }
}
