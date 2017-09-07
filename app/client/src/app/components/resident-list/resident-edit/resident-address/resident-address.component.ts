import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentAddress } from '../../../../shared/resident/resident-address';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { ResidentEditService } from '../resident-edit.service';
import { CityService } from '../../../../shared/city/city.service';
import { TypeAddressService } from '../../../../shared/type-address/type-address.service';

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
  private residentAddressList;
  private showAddressPanel;
  private tempPostCodeList;
  private postCodeList;
  private tempTypeAddresList;
  private typeAddressList;
  private residentAddress;
  private selectedPostCode;
  private previousSelectedPostCode;
  private selectedTypeAddress;
  private previousSelectedTypeAddress;
  
  @Input() switchInputs;
  @Input() residentId:number;
  @Output() emitResidentAddress;
  @Output() emitIsResidentAddressTableOpen;

  constructor(
    private residentService: ResidentService,
    private residentEditService: ResidentEditService,
    private cityService: CityService,
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
        
        this.emitResidentAddress = new EventEmitter<object>();
        this.emitIsResidentAddressTableOpen = new EventEmitter<boolean>();
        this.showAddressPanel = false;
        this.tempPostCodeList = [];
        this.tempTypeAddresList = [];
        this.postCodeList = [];
        this.typeAddressList = [];
        this.residentAddressList = [];
    
        this.selectedPostCode = [];
        this.selectedTypeAddress = [];
        this.previousSelectedPostCode = 0;
        this.previousSelectedTypeAddress = 0;
    
  }

  ngOnInit() {

    this.cityService.GetAllCities()
    .then(cities =>{
      cities.forEach((element, index) => {
        this.tempPostCodeList.push(
        {
          id: element.id,
          name: element.postCode
        })  
      });
      this.postCodeList = this.tempPostCodeList;

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
        
        this.residentService.GetResidentAddressById(this.residentId)
        .then(residentAddress =>{
          
          this.residentAddressList = residentAddress;

          // this.residentAddress.country = residentAddress[0].country;
          // this.residentAddress.city = residentAddress[0].city;
          // this.residentAddress.street = residentAddress[0].street;
          // this.residentAddress.houseNumber = residentAddress[0].house_number;
          // this.residentAddress.apartmentNumber = residentAddress[0].apartment_number;
          // this.residentAddress.postCode = residentAddress[0].post_code;
          // this.residentAddress.address = residentAddress[0].address;
          // this.residentAddress.addressTypeId = residentAddress[0].address_type_id;
          // this.residentAddress.residentId = this.residentId;
          
          this.emitResidentAddress.emit(this.residentAddress);
          this.selectedTypeAddress.push(this.residentAddress.addressTypeId);

          this.postCodeList.forEach((element, index) => {
            if(element.name == this.residentAddress.postCode){
              this.selectedPostCode.push(element.id);
            }
          })
          
        });
      })
      
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
           this.residentAddress.address = element.name;
        }
      });
      this.previousSelectedTypeAddress = this.selectedTypeAddress[0];
    };
  }

  AddNewAddress(){

    if(!this.showAddressPanel){
      this.showAddressPanel = true;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    }
    
  }

  GoBackToAddressTable(){
    if(this.showAddressPanel){
      this.showAddressPanel = false;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    }
  }
}
