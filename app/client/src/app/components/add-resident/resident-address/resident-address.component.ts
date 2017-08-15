import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentAddress } from '../../../shared/resident/resident-address';

import { ResidentService } from '../../../shared/resident/resident.service';
import { AddResidentService } from '../add-resident.service';


@Component({
  selector: 'resident-address',
  templateUrl: './resident-address.component.html',
  styleUrls: ['./resident-address.component.css']
})
export class ResidentAddressComponent implements OnInit, OnChanges, DoCheck {

  private residentAddress;
  @Output() emitResidentAddress;

  constructor(
    private residentService: ResidentService,
    private residentAddService: AddResidentService
  ) {
    this.residentAddress = {
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            apartmentNumber: '',
            postCode: '',
            address:'',
            addressTypeId: 1,
            residentId: 0
        }
    this.emitResidentAddress = new EventEmitter<object>();
  }

  ngOnInit() {
  }  
  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentAddress.emit(this.residentAddress);
  }
}
