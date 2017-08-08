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


  private residentDormitory: object;
  @Input() residentId:number;
  @Output() emitResidentDormitory;

  constructor(
    private residentService: ResidentService,
    private residentEditService: ResidentEditService
  ) {

    this.residentDormitory = {
      id: 0,
      dateOfArrival: '',
      dateOfDeparture: '',
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
        this.residentDormitory = residentDormitory;
        this.emitResidentDormitory.emit(this.residentDormitory);
        console.log(this.residentDormitory);
      })
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentDormitory.emit(this.residentDormitory);
  }
}
