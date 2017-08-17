import { Component, EventEmitter, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../shared/resident/resident.service';
import { UserSessionService } from '../../shared/user-session.service';
import { AddResidentService } from './add-resident.service';


@Component({
  selector: 'add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})

export class AddResidentComponent implements OnInit, DoCheck, OnChanges {


  private residentPersonalData;
  private residentAddress;
  private residentDocument;
  private residentDormitory;
  private residentId;
  private dormitoryId;
  private documentId;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location, 
    private residentService: ResidentService, 
    private userSessionService: UserSessionService, 
    private addResidentService: AddResidentService 
  ) 
  { 
    this.residentId = 0;
    this.dormitoryId = 0;
    this.documentId = 0;
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
      this.residentId = newResident.id;
      this.residentAddress.residentId = this.residentId;
      this.residentDocument.residentId = this.residentId;

      this.residentService.CreateNewResidentAddress(this.residentAddress)
      .then((newResidentAddress) =>{
        console.log(newResidentAddress);
        console.log('Dodano ADDRESS')
      })

      this.residentService.CreateNewResidentDocument(this.residentDocument)
      .then(newResidentDocument =>{
        console.log(newResidentDocument);
        console.log('Dodano DOKUMENT!');
        this.documentId = newResidentDocument.document_type_id;      
        this.residentDormitory.documentId = this.documentId;
        this.residentDormitory.residentId = this.residentId;

        this.residentService.CreateNewResidentDormitoryStay(this.residentDormitory)
        .then(newResidentDormitoryStay => {
          console.log(newResidentDormitoryStay);
          console.log('dodano AKADEMIK!');
        })
      })
    })
    //location.reload();
  }

}
