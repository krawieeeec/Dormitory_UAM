import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentDormitory } from '../../../../shared/resident/resident-dormitory';
import { ResidentService } from '../../../../shared/resident/resident.service';
import { ResidentAddService } from '../resident-add.service';
import { UserSessionService } from '../../../../shared/user-session.service';

@Component({
  selector: 'resident-dormitory',
  templateUrl: './resident-dormitory.component.html',
  styleUrls: ['./resident-dormitory.component.css']
})
export class ResidentDormitoryComponent implements OnInit {


  private residentDormitory;
  @Output() emitResidentDormitory;

  constructor(
    private residentService: ResidentService,
    private residentAddService: ResidentAddService,
    private userSession: UserSessionService
  ) {

    this.residentDormitory = {
      dateOfArrival: '',
      dateOfDeparture: '',
      dateOfTempDeparture: '1111-11-11',
      roomNumber: 0,
      dateCrossRp: '',
      comments: '',
      dormitoryId: 0,
      documentId: 0,
      residentId: 0
    }
    this.emitResidentDormitory = new EventEmitter<object>();
  }

  ngOnInit() {  
    this.residentDormitory.dormitoryId = this.userSession.GetChosenDormitoryId();
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentDormitory.emit(this.residentDormitory);
  }
}
