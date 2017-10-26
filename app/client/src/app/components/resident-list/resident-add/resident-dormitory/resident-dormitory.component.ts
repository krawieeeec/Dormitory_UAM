import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentDormitory } from '../../../../shared/resident/resident-dormitory';
import { ResidentService } from '../../../../shared/resident/resident.service';
import { UserSessionService } from '../../../../shared/user-session.service';

@Component({
  selector: 'resident-dormitory',
  templateUrl: './resident-dormitory.component.html',
  styleUrls: ['./resident-dormitory.component.css']
})

export class ResidentDormitoryComponent implements OnInit {

  private residentDormitory;
  private residentId;

  @Output() emitResidentDormitory;
  @Input() getResidentId;

  constructor(
    private residentService: ResidentService,
    private userSession: UserSessionService
  ) {

    this.residentDormitory = {
      dateOfArrival: '',
      dateOfDeparture: '',
      dateOfTempDeparture: '1111-11-11',
      roomNumber: 0,
      dateCrossRp: '',
      comments: '',
      dormitory_id: 0,
      temp_address_id: null,
      regular_address_id: 0,
      document_id: 0,
      resident_id: 0
    }
    this.emitResidentDormitory = new EventEmitter<object>();
    this.getResidentId = 0;
    this.residentId = 0;
  }

  ngOnInit() {  
    this.residentDormitory.dormitory_id = this.userSession.GetChosenDormitoryId();
  }
  
  ngOnChanges(){
    if(this.getResidentId != 0){
      this.residentId = this.getResidentId;
      this.residentDormitory.resident_id = this.residentId;
      
    }

  }
  
  ngDoCheck(){
    this.emitResidentDormitory.emit(this.residentDormitory);
  }
}
