import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentDormitory } from '../../../../shared/resident/resident-dormitory';
import { ResidentService } from '../../../../shared/resident/resident.service';

@Component({
  selector: 'resident-dormitory',
  templateUrl: './resident-dormitory.component.html',
  styleUrls: ['./resident-dormitory.component.css']
})
export class ResidentDormitoryComponent implements OnInit {

  
  private residentDormitory;
  @Input() switchInputs;
  @Input() stayResidentId:number;
  @Output() emitResidentDormitory;
  

  constructor(
    private residentService: ResidentService,
  
  ) {

    this.residentDormitory = {
      dateOfArrival: '',
      dateOfDeparture: '',
      dateOfTempDeparture: '',
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
    this.residentService.GetResidentStayById(this.stayResidentId)
      .then(response =>{
        console.log(response.stayResident);
        this.residentDormitory.dateOfArrival = response.stayResident.dateOfArrival;
        this.residentDormitory.dateOfDeparture = response.stayResident.dateOfDeparture;
        this.residentDormitory.dateOfTempDeparture = response.stayResident.dateOfTempDeparture;
        this.residentDormitory.roomNumber = response.stayResident.roomNumber;
        this.residentDormitory.dateCrossRp = response.stayResident.dateCrossRp;
        this.residentDormitory.comments = response.stayResident.comments;
        this.residentDormitory.dormitoryId = response.stayResident.dormitory_id;
        this.residentDormitory.documentId = response.stayResident.document_id;
        this.residentDormitory.residentId = response.stayResident.resident_id;

        this.emitResidentDormitory.emit(this.residentDormitory);

      })
      
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentDormitory.emit(this.residentDormitory);
  }

}
