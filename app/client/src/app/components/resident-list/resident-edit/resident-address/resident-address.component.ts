import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentAddress } from '../../../../shared/resident/resident-address';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { ResidentEditService } from '../resident-edit.service';


@Component({
  selector: 'resident-address',
  templateUrl: './resident-address.component.html',
  styleUrls: ['./resident-address.component.css']
})
export class ResidentAddressComponent implements OnInit, OnChanges, DoCheck {

  private residentAddress:object;
  @Input() residentId:number;
  @Output() emitResidentAddress;

  constructor(
    private residentService: ResidentService,
    private residentEditService: ResidentEditService
  ) {
    this.residentAddress = {
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            apartmentNumber: '',
            postCode: '',
            address_type_id: 0,
            resident_id: 0
        }
    this.emitResidentAddress = new EventEmitter<object>();
  }

  ngOnInit() {

    this.residentService.GetResidentAddressById(this.residentId)
    .then(residentAddress =>{
      this.residentAddress = residentAddress;
      this.emitResidentAddress.emit(residentAddress);
      console.log(this.residentAddress);
      
    });
    console.log(this.residentAddress)
  
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){

  }
}
