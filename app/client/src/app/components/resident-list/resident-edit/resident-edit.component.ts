import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident/resident.service';
import { UserSessionService } from '../../../shared/user-session.service';
import { ResidentListService } from '../services/resident-list.serivce';


@Component({
  selector: 'resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css']
})

export class ResidentEditComponent implements OnInit, DoCheck, OnChanges {


  private residentPersonalData;
  private residentAddressList;
  private residentDocumentList;
  private residentDormitory;
  private residentId;
  private stayResidentId;
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
    private residentListService: ResidentListService 
  ) { 
    
    this.switchInputs = true;
    this.showEditButtons = true;
    this.isResidentAddressTableOpen = true;
    this.isResidentDocumentTableOpen = true;  
  }

  ngOnInit() {

    this.residentId = this.route.snapshot.params.residentId;
    this.stayResidentId = this.route.snapshot.params.stayResidentId;
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

  GetResidentAddress(residentAddressList){
    this.residentAddressList = residentAddressList;
    //  console.log(this.residentAddressList);
    //  console.log('resident-edit-address');
  }
  
  GetResidentDocument(residentDocumentList){
    this.residentDocumentList = residentDocumentList;
    //  console.log(this.residentDocumentList);
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
  
  EditResident():void{
  //  console.log(this.residentPersonalData);
    this.residentService.UpdateResidentPersonalDataById(this.residentPersonalData, this.residentId)
    .then((response) => {
      if(response.isUpdated){
        console.log(this.residentAddressList);
        console.log(this.residentDocumentList);
        this.residentAddressList.forEach(element => {
          if(element.isUsed){
            console.log(element);
            if(element.address == "Stały"){
              this.residentDormitory.regular_address_id = element.id;
            }else{
              this.residentDormitory.temp_address_id = element.id;
            }
          }
        });
        this.residentDocumentList.forEach(element => {
          if(element.isUsed){
            this.residentDormitory.document_id = element.id;
          }          
        });
        this.residentListService.SetResidentListObservable$(true);
        
        console.log('UPDATED - PersonalDATA');
        console.log(this.residentDormitory);
        this.residentService.UpdateResidentDormitoryById(this.residentDormitory, this.stayResidentId)
        .then((response) =>{
          console.log(response);
          this.router.navigate(['/residentList', this.dormitoryId]);
          console.log('UPDATED - residentDormitory');
          this.residentListService.SetResidentListObservable$(true);
        })
      }
    }).catch(response =>{
      console.log(response.errorMessage);
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
