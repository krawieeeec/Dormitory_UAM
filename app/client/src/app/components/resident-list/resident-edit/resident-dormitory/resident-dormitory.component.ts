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
      dormitory_id: 0,
      document_id: 0,
      resident_id: 0,
      regular_address_id: 0,
      temp_address_id: null
    }
    this.emitResidentDormitory = new EventEmitter<object>();
    
  }

  ngOnInit() {
    console.log(this.stayResidentId);
    this.residentService.GetResidentStayById(this.stayResidentId)
      .then(response =>{
        console.log(response);
        this.residentDormitory.dateOfArrival = response.stayResident.dateOfArrival;
        this.residentDormitory.dateOfDeparture = response.stayResident.dateOfDeparture;
        this.residentDormitory.dateOfTempDeparture = response.stayResident.dateOfTempDeparture;
        this.residentDormitory.roomNumber = response.stayResident.roomNumber;
        this.residentDormitory.dateCrossRp = response.stayResident.dateCrossRp;
        this.residentDormitory.comments = response.stayResident.comments;
        this.residentDormitory.dormitory_id = response.stayResident.dormitory_id;
        this.residentDormitory.document_id = response.stayResident.document_id;
        this.residentDormitory.resident_id = response.stayResident.resident_id;
        // this.residentDormitory.regular_address_id = response.stayResident.regular_address_id;
        // this.residentDormitory.temp_address_id = response.stayResident.temp_address_id; 

        this.emitResidentDormitory.emit(this.residentDormitory);

      })
      
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentDormitory.emit(this.residentDormitory);
  }

}
