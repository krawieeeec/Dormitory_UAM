import { Component, EventEmitter, Output, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ResidentAddress } from '../../../../shared/resident/resident-address';

import { ResidentService } from '../../../../shared/resident/resident.service';
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
  private idSelectedAddress;
  private indexSelectedAddress;
  private showEditAddressButton;
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
  private selectedAddresses;
  
  @Input() residentId:number;
  @Input() stayResidentId: number;
  @Output() emitResidentAddressList;
  @Output() emitIsResidentAddressTableOpen;

  constructor(
    private residentService: ResidentService,
    private cityService: CityService,
    private typeAddressService: TypeAddressService 
  ) {
    this.residentAddress = {
            id: 0,
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            apartmentNumber: '',
            postCode: '',
            address:'',
            address_type_id: 0,
            resident_id: 0
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
        
        this.emitResidentAddressList = new EventEmitter<any>();
        this.emitIsResidentAddressTableOpen = new EventEmitter<boolean>();
        this.showAddressPanel = false;
        this.tempPostCodeList = [];
        this.tempTypeAddresList = [];
        this.postCodeList = [];
        this.typeAddressList = [];
        this.residentAddressList = [];
        this.selectedAddresses = {
          regularAddressId: 0,
          tempAddressId: 0
        };
        this.stayResidentId = 0;
        this.residentId = 0;
    
        this.selectedPostCode = [];
        this.selectedTypeAddress = [];
        this.previousSelectedPostCode = 0;
        this.previousSelectedTypeAddress = 0;
        this.showEditAddressButton = false;
        this.indexSelectedAddress = 0;
        this.idSelectedAddress = 0;
  }

  ngOnInit() {

    this.residentService.GetResidentStayById(this.stayResidentId)
    .then(response => {
      this.selectedAddresses.tempAddressId = response.stayResident.temp_address_id;
      this.selectedAddresses.regularAddressId = response.stayResident.regular_address_id;
    })

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
        .then(residentAddressList =>{
          
          this.residentAddressList = residentAddressList;
          this.residentAddressList.forEach(element => {
            element.isNew = false;
            element.isUpdated = false;
            if((element.id == this.selectedAddresses.tempAddressId) || (element.id == this.selectedAddresses.regularAddressId)){
              element.isUsed = true;  
            }else{
              element.isUsed = false;
            }
          });
          this.emitResidentAddressList.emit(this.residentAddressList);
          
        });
      })
      
    })
  }
  
  ngOnChanges(){

  }
  
  ngDoCheck(){

    this.emitResidentAddressList.emit(this.residentAddressList);

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
           this.residentAddress.address_type_id = element.id;
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
    
    this.indexSelectedAddress = undefined;
  }

  EditAddress(index, addressId){

    this.showEditAddressButton = true;
    this.indexSelectedAddress = index;
    this.idSelectedAddress = addressId;

    if(!this.showAddressPanel){
      this.showAddressPanel = true;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    } 

    this.residentAddress.id = this.residentAddressList[index].id;
    this.residentAddress.country = this.residentAddressList[index].country;
    this.residentAddress.city = this.residentAddressList[index].city;
    this.residentAddress.street = this.residentAddressList[index].street;
    this.residentAddress.houseNumber = this.residentAddressList[index].houseNumber;
    this.residentAddress.apartmentNumber = this.residentAddressList[index].apartmentNumber;
    this.residentAddress.postCode = this.residentAddressList[index].postCode;
    this.residentAddress.address = this.residentAddressList[index].address;
    this.residentAddress.address_type_id = this.residentAddressList[index].address_type_id;
    this.residentAddress.resident_id = this.residentId;
    this.residentAddress.isNew = this.residentAddressList[index].isNew;
    this.residentAddress.isUpdated = this.residentAddressList[index].isUpdated;
    this.residentAddress.isUsed = this.residentAddressList[index].isUsed;

    if(this.selectedPostCode.length == 0){
      this.postCodeList.forEach((element, index) => {
        if(element.name == this.residentAddress.postCode){
          this.selectedPostCode.push(element.id);
        }
      })
    }
    
    if(this.selectedTypeAddress.length == 0){
      this.typeAddressList.forEach((element, index) => {
        if(element.name == this.residentAddress.address){
          this.selectedTypeAddress.push(element.id);
        }
      })
    }
  }

  GoBackToAddressTable(){

    this.showEditAddressButton = false;
    
    if(this.showAddressPanel){
      this.showAddressPanel = false;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    }

    this.residentAddress.id = 0;
    this.residentAddress.country = '';
    this.residentAddress.city = '';
    this.residentAddress.street = '';
    this.residentAddress.houseNumber = '';
    this.residentAddress.apartmentNumber = ''
    this.residentAddress.postCode = '';
    this.residentAddress.address = ''
    this.residentAddress.address_type_id = 0;
    this.residentAddress.resident_id = this.residentId;
    this.selectedPostCode = [];
    this.selectedTypeAddress = [];
    this.previousSelectedPostCode = '';
    this.previousSelectedTypeAddress = '';

  }

  SaveAddress(){
    
    
    let tempResidentAddress;
    
    if(this.indexSelectedAddress != undefined){
      tempResidentAddress  = Object.assign({}, this.residentAddress);
      this.residentAddressList[this.indexSelectedAddress] = tempResidentAddress;
      
      this.residentService.UpdateResidentAddressById(this.residentAddress)
      .then(response=>{
        if(response.isUpdated){
          this.residentAddressList[this.indexSelectedAddress].isUpdated = true;
        }       
      })
    }else{
      
      this.residentAddress.resident_id = this.residentId;
      tempResidentAddress  = Object.assign({}, this.residentAddress);
      
      console.log(this.residentAddress)
      this.residentService.CreateNewResidentAddress([tempResidentAddress])
      .then(response=>{
        if(response.isCreated){
          response.newResidentAddresses[0].address = tempResidentAddress.address;
          response.newResidentAddresses[0].isNew = true;
          response.newResidentAddresses[0].isUpdated = false;
          response.newResidentAddresses[0].isUsed = false;
          this.residentAddressList.push(response.newResidentAddresses[0]);          
        }  
      })
    }
    
    this.residentAddress.id = 0;
    this.residentAddress.country = '';
    this.residentAddress.city = '';
    this.residentAddress.street = '';
    this.residentAddress.houseNumber = '';
    this.residentAddress.apartmentNumber = ''
    this.residentAddress.postCode = '';
    this.residentAddress.address = ''
    this.residentAddress.address_type_id = 0;
    this.residentAddress.resident_id = this.residentId;
    this.selectedPostCode = [];
    this.selectedTypeAddress = [];
    this.previousSelectedPostCode = '';
    this.previousSelectedTypeAddress = '';

    if(this.showAddressPanel){
      this.showAddressPanel = false;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    }
  }

  UseAddress(index){
    let residentTypeAddress;

    if(this.residentAddressList[index].isUsed == false){
      residentTypeAddress = this.residentAddressList[index].address;
      
      this.residentAddressList.forEach(element => {
        if((element.address == residentTypeAddress) && (element.isUsed == true)){
          element.isUsed = false;
        }  
      });
      this.residentAddressList[index].isUsed = true
    }else{
      this.residentAddressList[index].isUsed = false
    }
  }
  

  DeleteAddress(index, addressId){
    
    this.residentAddressList.splice(index, 1);
    this.residentService.DeleteResidentAddressById(addressId)
    .then(()=>{

    })
  }
}
