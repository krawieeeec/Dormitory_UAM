import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentAddress } from '../../../shared/resident/resident-address';

import { ResidentService } from '../../../shared/resident/resident.service';
import { AddResidentService } from '../add-resident.service';
import { CityService } from '../../../shared/city/city.service';
import { TypeAddressService } from '../../../shared/type-address/type-address.service';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'resident-address',
  templateUrl: './resident-address.component.html',
  styleUrls: ['./resident-address.component.css']
})
export class ResidentAddressComponent implements OnInit, OnChanges, DoCheck {

  private settingsSelectButton: IMultiSelectSettings; 
  private settingsTextPostCodeSelectButton: IMultiSelectTexts; 
  private settingsTextTypeAddressSelectButton: IMultiSelectTexts;
  private tempPostCodeList;
  private postCodeList;
  private tempTypeAddresList;
  private typeAddressList;
  private residentAddress;
  private selectedPostCode;
  private previousSelectedPostCode;
  private selectedTypeAddress;
  private previousSelectedTypeAddress;

  @Output() emitResidentAddress;

  constructor(
    private residentService: ResidentService,
    private residentAddService: AddResidentService,
    private citySerivice: CityService,
    private typeAddressService: TypeAddressService
  ) {
    this.residentAddress = {
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            apartmentNumber: '',
            postCode: '',
            address:'',
            addressTypeId: 0,
            residentId: 0
        }
    this.emitResidentAddress = new EventEmitter<object>();
    
    this.settingsSelectButton  = {
      enableSearch: true,
      checkedStyle: 'glyphicon',
      buttonClasses: 'btn btn-default btn-block form-select',
      itemClasses: 'form-select ',
      containerClasses: 'form-select',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true,
      selectionLimit: 1,
      autoUnselect: true,
      searchRenderLimit: 2,
      closeOnClickOutside: true,
      searchMaxLimit: 3	
    };
    this.settingsTextPostCodeSelectButton = {
      searchPlaceholder: 'Wpisz kod pocztowy',
      defaultTitle: 'Wybierz Kod Pocztowy',
      searchEmptyResult: 'Brak',
      searchNoRenderText: 'Wpisz kod pocztowy w wyszukiwarce'
    };

    this.settingsTextTypeAddressSelectButton = {
      searchPlaceholder: 'Wpisz typ adresu',
      defaultTitle: 'Wybierz Typ Adresu',
      searchEmptyResult: 'Brak',
      searchNoRenderText: 'Wpisz typ adresu w wyszukiwarce'
    };

    this.tempPostCodeList = [];
    this.tempTypeAddresList = [];
    this.postCodeList = [];
    this.typeAddressList = [];

    this.selectedPostCode = [];
    this.selectedTypeAddress = [];
    this.previousSelectedPostCode = 0;
    this.previousSelectedTypeAddress = 0;
  }

  ngOnInit() {
    this.citySerivice.GetAllCities()
      .then(cities =>{
        cities.forEach((element, index) => {
          this.tempPostCodeList.push(
          {
            id: element.id,
            name: element.postCode
          })  
        });
        this.postCodeList = this.tempPostCodeList;
      })

      this.typeAddressService.GetAllTypeAddress()
      .then( typeAddresses =>{
        typeAddresses.forEach((element, index) => {
          this.tempTypeAddresList.push(
          {
            id: element.id,
            name: element.address
          })  
        });
        this.typeAddressList = this.tempTypeAddresList;
      })
  }
  ngOnChanges(){
    
  }
  
  ngDoCheck(){
    
    this.emitResidentAddress.emit(this.residentAddress);
    
    if(this.selectedPostCode.length > 0 && (this.previousSelectedPostCode != this.selectedPostCode[0])){
      this.postCodeList.forEach(element => {
        if(element.id == this.selectedPostCode[0]){
        
           this.residentAddress.postCode = element.name;
        }
      });
      this.previousSelectedPostCode = this.selectedPostCode[0];
    };

    if(this.selectedTypeAddress.length > 0 && (this.previousSelectedTypeAddress != this.selectedTypeAddress[0])){
      this.typeAddressList.forEach(element => {
        if(element.id == this.selectedTypeAddress[0]){
        
           this.residentAddress.addressTypeId = element.id;
        }
      });
      this.previousSelectedTypeAddress = this.selectedTypeAddress[0];
      console.log(this.residentAddress);
    };
  }
}
