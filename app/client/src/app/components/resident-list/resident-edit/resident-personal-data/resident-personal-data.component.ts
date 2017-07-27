import { Component, EventEmitter, Output, OnInit, Input, OnChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentService } from '../../../../shared/resident.service';
import { Resident} from '../../../../shared/resident';
@Component({
  selector: 'resident-personal-data',
  templateUrl: './resident-personal-data.component.html',
  styleUrls: ['./resident-personal-data.component.css']
})
export class ResidentPersonalDataComponent implements OnChanges {

  private resident;

  @Input() residentId:number;
  

  constructor(private residentService: ResidentService) {   
      this.resident ={
        id: 0,
        name: '',
        surname: ''
      }
  }
  ngOnChanges() {
    this.residentService.GetResidentById(this.residentId)
        .then(resident => 
          this.resident = resident
          
        );  
  }

  EditResidentPersonalData():void{
    
  }
}
