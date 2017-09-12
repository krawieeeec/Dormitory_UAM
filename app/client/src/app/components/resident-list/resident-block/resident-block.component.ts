import { Component, EventEmitter, Input, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location, NgSwitch, NgSwitchCase } from '@angular/common';

import { ResidentService } from '../../../shared/resident/resident.service';
import { UserSessionService } from '../../../shared/user-session.service';
import { ResidentAccountService } from '../../../shared/resident-account/resident-account.service';
import { BlockadeHistoryService } from '../../../shared/blockade-history/blockade-history.service';
import { ResidentStayService } from '../../../shared/resident-stay/resident-stay.service';
import { ResidentListService } from '../services/resident-list.serivce';


@Component({
  selector: 'resident-block',
  templateUrl: './resident-block.component.html',
  styleUrls: ['./resident-block.component.css']
})

export class ResidentBlockComponent implements OnInit, DoCheck, OnChanges {

  private userEmployeeId;
  private residentAccount;
  private residentPersonalData;
  private residentBlockadeHistory;
  private newResidentAccountBlockade;
  private residentId;
  private dormitoryId;
  private blockadeStateList;
  private disabledInput;
  private hideBlockPanel;

  constructor(

    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location,
    private residentService: ResidentService,
    private residentAccountService: ResidentAccountService,
    private userSessionService: UserSessionService,
    private blockadeHistoryService: BlockadeHistoryService,
    private residentStayService: ResidentStayService,
    private residentListService: ResidentListService
  )
  
  {

    this.newResidentAccountBlockade = {
      id: 0,
      comment: '',
      blockade_type: '',
      account_resident_id: 0,
      stay_resident_id: 0,
      employee_id: 1,
      hasEdited: false,
      elementIndex: 0
    }

    this.residentAccount = {
      id: 0,
      uid: 0,
      password: '',
      validityAccountDate: '',
      accountState: '',
      residentId: 0,
      dormitoryId: 0
    }

    this.residentPersonalData = {
      name: '',
      surname: '',
    }
    
    this.blockadeStateList = ["Stały", "Okresowy"];
    this.residentBlockadeHistory = [];
    this.disabledInput = true;
    this.hideBlockPanel = true;
    this.residentId = 0;
    this.dormitoryId = 0;
    this.userEmployeeId = 1;
  }

  ngOnInit() {

    this.residentId = this.route.snapshot.params.id;
    this.dormitoryId = this.userSessionService.GetChosenDormitoryId();
    
    this.residentStayService.GetResidentStayById(this.residentId)
    .then( residentStay=>{
      this.newResidentAccountBlockade.stay_resident_id = residentStay.id;
      
    })

    this.residentAccountService.GetResidentAccountCurrentDormitoryById(this.residentId, this.dormitoryId)
    .then((residentAccount)=>{
      
      this.residentAccount.id = residentAccount[0].id;
      this.residentAccount.uid = residentAccount[0].uid;
      this.residentAccount.password = residentAccount[0].password;
      this.residentAccount.accountState = residentAccount[0].accountState;
      this.residentAccount.validityAccountDate = residentAccount[0].validityAccountDate;
      this.residentAccount.residentId = residentAccount[0].resident_id;
      this.residentAccount.dormitoryId = residentAccount[0].dormitory_id;
      
      this.newResidentAccountBlockade.account_resident_id = this.residentAccount.id;

      this.residentService.GetResidentPersonalDataById(this.residentId)
      .then(
        residentPersonalData => {
          
          this.residentPersonalData.name = residentPersonalData[0].name;
          this.residentPersonalData.surname = residentPersonalData[0].surname;

        }
      );

      this.blockadeHistoryService.GetAllResidentAccountBlockadeHistoryById(this.residentAccount.id, this.dormitoryId)
      .then(residentAccountBlokadeHistory =>{
        this.residentBlockadeHistory = residentAccountBlokadeHistory;
        this.residentBlockadeHistory.forEach(element => {
          element.hasEdited = false;
          element.index = 0;          
        });
        
      })
    })
    
  }

  ngDoCheck(){
    
  }

  ngOnChanges(){

  }
  AddBlockadeToList(){
    
    let newTempResidentAccountBlockade
    
    if(this.newResidentAccountBlockade.hasEdited){
      
      this.residentBlockadeHistory[this.newResidentAccountBlockade.index].comment = this.newResidentAccountBlockade.comment;
      this.residentBlockadeHistory[this.newResidentAccountBlockade.index].blockade_type = this.newResidentAccountBlockade.blockade_type;
      
      this.blockadeHistoryService.UpdateResidentAccountBlockadeById(this.residentBlockadeHistory[this.newResidentAccountBlockade.index].id, this.newResidentAccountBlockade)
      .then(()=>{
        this.blockadeHistoryService.GetAllResidentAccountBlockadeHistoryById(this.residentAccount.id, this.dormitoryId)
        .then(residentAccountBlokadeHistory =>{
          this.residentBlockadeHistory = residentAccountBlokadeHistory;
          this.residentBlockadeHistory.forEach(element => {
            element.hasEdited = false;
            element.index = 0;          
          });
        })
      })
    }else {
      
      
      newTempResidentAccountBlockade = Object.assign({}, this.newResidentAccountBlockade);
      this.residentBlockadeHistory.push(newTempResidentAccountBlockade);
      
      this.blockadeHistoryService.CreateNewAccountResidentBlockade(this.newResidentAccountBlockade)
      .then(response =>{
        this.blockadeHistoryService.GetAllResidentAccountBlockadeHistoryById(this.residentAccount.id, this.dormitoryId)
        .then(residentAccountBlokadeHistory =>{
          this.residentBlockadeHistory = residentAccountBlokadeHistory;
          this.residentBlockadeHistory.forEach(element => {
            element.hasEdited = false;
            element.index = 0;          
          });
        })
        this.newResidentAccountBlockade.comment = "";
        this.newResidentAccountBlockade.blockade_type = "";
        this.newResidentAccountBlockade.hasAdded = false;
        this.newResidentAccountBlockade.hasEdited = false;
        this.newResidentAccountBlockade.index = 0;
      })

      if( 
        (this.residentBlockadeHistory.length > 0) &&
        (this.residentAccount.accountState == "Odblokowana")
      ){
        this.residentAccount.accountState = "Zablokowana";
        this.residentAccountService.UpdateResidentAccountById(this.residentId, this.dormitoryId, this.residentAccount)
        .then(response =>{
          console.log('Zablokowana');
          this.residentListService.SetResidentListObservable$(true);
        })
      }else if(
        (this.residentBlockadeHistory.length > 0) &&
        (this.residentAccount.accountState == "Odblokowany")
      ){
        this.residentAccount.accountState = "Zablokowany";
        this.residentAccountService.UpdateResidentAccountById(this.residentId, this.dormitoryId, this.residentAccount)
        .then(response =>{
          console.log('Zablokowany');
          this.residentListService.SetResidentListObservable$(true);
        })
      }
    }
      
    if(!this.hideBlockPanel){
      this.hideBlockPanel = true;
    }

    
  }

  EditBlockade(index){
    
    this.newResidentAccountBlockade.hasEdited = true;
    this.newResidentAccountBlockade.comment = this.residentBlockadeHistory[index].comment;
    this.newResidentAccountBlockade.blockade_type = this.residentBlockadeHistory[index].blockade_type;
    this.newResidentAccountBlockade.index = index;
    

    if(this.hideBlockPanel){
      this.hideBlockPanel = false
    }
  }

  DeleteBlockade(blockadeId, index){

    this.residentBlockadeHistory.splice(index, 1);
    this.blockadeHistoryService.DeleteAccountResidentBlockadeById(blockadeId)
    .then(response =>{      
    })

    if( 
      (this.residentBlockadeHistory.length == 0) &&
      (this.residentAccount.accountState == "Zablokowana")
    ){
      this.residentAccount.accountState = "Odblokowana";
      this.residentAccountService.UpdateResidentAccountById(this.residentId, this.dormitoryId, this.residentAccount)
      .then(response =>{
        console.log('Odblokowana');
        this.residentListService.SetResidentListObservable$(true);
      })
    }else if(
      (this.residentBlockadeHistory.length == 0) &&
      (this.residentAccount.accountState == "Zablokowany")
    ){
      this.residentAccount.accountState = "Odblokowany";
      this.residentAccountService.UpdateResidentAccountById(this.residentId, this.dormitoryId, this.residentAccount)
      .then(response =>{
        console.log('Odblokowany');
        this.residentListService.SetResidentListObservable$(true);
      })
    }
    
  }

  ShowBlockadePanel(){
    if(this.hideBlockPanel){
      this.hideBlockPanel = false
    }else{
      this.hideBlockPanel = true;
    }
    this.newResidentAccountBlockade.hasEdited = false;
    this.newResidentAccountBlockade.comment = '';
    this.newResidentAccountBlockade.blockade_type = '';
    this.newResidentAccountBlockade.index = 0;
  }

  
}
