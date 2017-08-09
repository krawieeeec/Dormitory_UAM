import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared//resident/resident.service';
import { UserSessionService } from '../../../shared/user-session.service';
import { ResidentEditService } from './resident-edit.service';

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
  private updateResidentList$;
  private switchInputs;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location, 
    private residentService: ResidentService, 
    private userSessionService: UserSessionService, 
    private residentEditService: ResidentEditService 
  ) { 
    
    this.switchInputs = true;
  }

  ngOnInit() {

    this.residentId = this.route.snapshot.params.id;
    this.dormitoryId = this.userSessionService.GetChosenDormitoryId();
    this.updateResidentList$ = this.residentEditService.GetUpdateResidentListObservable$();
  }

  ngDoCheck(){
  }
  ngOnChanges(){
  
  }

  GetResidentPersonalData(residentPersonalData){
    this.residentPersonalData = residentPersonalData;
  }

  GetResidentAddress(residentAddress){
    this.residentAddress = residentAddress;
   // console.log(this.residentAddress);
  //  console.log('resident-edit-address');
  }
  
  GetResidentDocument(residentDocument){
    this.residentDocument = residentDocument;
   // console.log(this.residentDocument);
   // console.log('resident-edit-document');
  }

  GetResidentDormitory(residentDormitory){
    this.residentDormitory = residentDormitory;
  //  console.log(this.residentDormitory);
//    console.log('resident-edit-dormitory');
  }

  GoBack():void{
    //this.location.back();
    this.router.navigate(['residentList', this.dormitoryId]);
 
  }

  SwitchInputs():void{
    if(this.switchInputs){
      this.switchInputs = false;
    }else{
      this.switchInputs = true;
    }
  }

  EditResident():void{
  //  console.log(this.residentPersonalData);
    this.residentService.UpdateResident(this.residentPersonalData, this.residentId)
    .then(() => {
     // this.router.navigate(['/residentList', this.dormitoryId]);
      console.log('UPDATED');
    })
    .catch(error => console.log(error))
    //this.router.navigate(['/residentList', this.dormitoryId]);
    
    this.updateResidentList$.next(true);
    
  }
}
