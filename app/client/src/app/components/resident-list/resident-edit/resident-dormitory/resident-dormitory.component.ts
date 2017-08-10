import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentDormitory } from '../../../../shared/resident/resident-dormitory';
import { ResidentService } from '../../../../shared/resident/resident.service';
import { ResidentEditService } from '../resident-edit.service';

@Component({
  selector: 'resident-dormitory',
  templateUrl: './resident-dormitory.component.html',
  styleUrls: ['./resident-dormitory.component.css']
})
export class ResidentDormitoryComponent implements OnInit {


  private residentDormitory;
  @Input() switchInputs;
  @Input() residentId:number;
  @Output() emitResidentDormitory;

  constructor(
    private residentService: ResidentService,
    private residentEditService: ResidentEditService
  ) {

    this.residentDormitory = {
      dateOfArrival: '',
      dateOfDeparture: '',
      dateOfTempDeparture: '',
      roomNumber: 0,
      dateCrossRp: '',
      dormitoryId: 0,
      documentId: 0,
      residentId: 0
    }
    this.emitResidentDormitory = new EventEmitter<object>();
  }

  ngOnInit() {

    this.residentService.GetResidentStayById(this.residentId)
      .then(residentDormitory =>{

        this.residentDormitory.dateOfArrival = residentDormitory.dateOfArrival;
        this.residentDormitory.dateOfDeparture = residentDormitory.dateOfDeparture;
        this.residentDormitory.dateOfTempDeparture = residentDormitory.dateOfTempDeparture;
        this.residentDormitory.roomNumber = residentDormitory.roomNumber;
        this.residentDormitory.dateCrossRp = residentDormitory.dateCrossRp;
        this.residentDormitory.comments = residentDormitory.comments;
        this.residentDormitory.dormitoryId = residentDormitory.dormitory_id;
        this.residentDormitory.documentId = residentDormitory.document_id;
        this.residentDormitory.residentId = residentDormitory.resident_id;

        this.emitResidentDormitory.emit(this.residentDormitory);

      })
      
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentDormitory.emit(this.residentDormitory);
  }
}
