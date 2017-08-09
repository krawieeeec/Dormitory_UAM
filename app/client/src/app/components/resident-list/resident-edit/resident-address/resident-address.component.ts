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

  private residentAddress;
  @Input() switchInputs;
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
            address:''
        }
    this.emitResidentAddress = new EventEmitter<object>();
  }

  ngOnInit() {

    this.residentService.GetResidentAddressById(this.residentId)
    .then(residentAddress =>{
      this.residentAddress.country = residentAddress[0].country;
      this.residentAddress.city = residentAddress[0].city;
      this.residentAddress.street = residentAddress[0].street;
      this.residentAddress.houseNumber = residentAddress[0].house_number;
      this.residentAddress.apartmentNumber = residentAddress[0].apartment_number;
      this.residentAddress.postCode = residentAddress[0].post_code;
      this.residentAddress.address = residentAddress[0].address;
      
      
      
      
      this.emitResidentAddress.emit(this.residentAddress);
      
    });
  
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentAddress.emit(this.residentAddress);
  }
}
