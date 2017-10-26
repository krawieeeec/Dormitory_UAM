import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Input,
  OnChanges,
  DoCheck
} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ResidentAddress} from '../../../../shared/resident/resident-address';

import {ResidentService} from '../../../../shared/resident/resident.service';
import {CityService} from '../../../../shared/city/city.service';
import {TypeAddressService} from '../../../../shared/type-address/type-address.service';
import {ResidentAddService} from '../resident-add.service';

import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'resident-address', 
  templateUrl: './resident-address.component.html', 
  styleUrls: ['./resident-address.component.css']
})
export class ResidentAddressComponent implements OnInit, OnChanges, DoCheck {

  private settingsSelectButton : IMultiSelectSettings;
  private settingsTextPostCodeSelectButton : IMultiSelectTexts;
  private settingsTextTypeAddressSelectButton : IMultiSelectTexts;
  private tempPostCodeList;
  private postCodeList;
  private tempTypeAddresList;
  private typeAddressList;
  private selectedPostCode;
  private previousSelectedPostCode;
  private selectedTypeAddress;
  private previousSelectedTypeAddress;

  private residentAddress;
  private residentId;
  private showAddressPanel;
  private showEditAddressButton;
  private indexSelectedAddress;
  private residentAddressList;
  private setHoverClass;

  @Output() emitResidentAddressList;
  @Output() emitIsResidentAddressTableOpen;
  @Input() getResidentAddressList: Array<object>; 
  @Input() getResidentId;

  constructor(
    private residentService : ResidentService, 
    private cityService : CityService, 
    private residentAddService : ResidentAddService, 
    private typeAddressService : TypeAddressService
  ) {

    this.residentAddress = {
      id: 0,
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      postCode: '',
      address: '',
      address_type_id: 0,
      resident_id: 0,
      isUsed: false,
      isNew: false,
      isUpdated: false
    }

    this.settingsSelectButton = {
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

    this.emitIsResidentAddressTableOpen = new EventEmitter < boolean > ();
    this.emitResidentAddressList = new EventEmitter < any > ();

    this.tempPostCodeList = [];
    this.tempTypeAddresList = [];
    this.postCodeList = [];
    this.typeAddressList = [];

    this.selectedPostCode = [];
    this.selectedTypeAddress = [];
    this.previousSelectedPostCode = 0;
    this.previousSelectedTypeAddress = 0;
    this.showAddressPanel = false;
    this.showEditAddressButton = false;
    this.indexSelectedAddress = 0;
    this.residentAddressList = [];
    this.getResidentAddressList = [];
    this.setHoverClass = false;
    this.residentId = 0;
    this.getResidentId = 0;
  }

  /////////////////////////////////////////LIFE CYCLE OF COMPONENT///////////////////////////////////////////////

  ngOnInit() {
    this.cityService.GetAllCities()
      .then(cities => {
        cities.forEach((element, index) => {
          this.tempPostCodeList.push({id: element.id, name: element.postCode})
          });
        this.postCodeList = this.tempPostCodeList;
      })

    this
      .typeAddressService.GetAllTypeAddress()
        .then(typeAddresses => {
          typeAddresses.forEach((element, index) => {
            this.tempTypeAddresList.push({id: element.id, name: element.address})
        });
        this.typeAddressList = this.tempTypeAddresList;
      })
  }

  ngOnChanges() {
    if(this.getResidentId != 0){
      this.residentId = this.getResidentId;
    }

    this.residentAddressList = [];
    this.residentAddressList = this.getResidentAddressList;
    this.residentAddressList.forEach(element => {
      element.isUsed = false;
      element.isNew = false;
      element.isUpdated = false;
    });
  }

  ngDoCheck() {

    this.emitResidentAddressList.emit(this.residentAddressList);

    if (this.selectedPostCode.length > 0 && (this.previousSelectedPostCode != this.selectedPostCode[0])) {
      this.postCodeList.forEach(element => {
          if (element.id == this.selectedPostCode[0]) {
            this.residentAddress.postCode = element.name;
          }
        });
      this.previousSelectedPostCode = this.selectedPostCode[0];
    };

    if (this.selectedTypeAddress.length > 0 && (this.previousSelectedTypeAddress != this.selectedTypeAddress[0])) {
      this.typeAddressList.forEach(element => {
          if (element.id == this.selectedTypeAddress[0]) {
            this.residentAddress.address = element.name;
            this.residentAddress.address_type_id = element.id;
          }
        });
      this.previousSelectedTypeAddress = this.selectedTypeAddress[0];
    };
  }

  /////////////////////////////////////////FUNCTION OF COMPONENT///////////////////////////////////////////////

  AddNewAddress() {
    if (!this.showAddressPanel) {
      this.showAddressPanel = true;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    }
    
    this.indexSelectedAddress = undefined;
  }

  EditAddress(index) {
    this.showEditAddressButton = true;
    this.indexSelectedAddress = index;

    if (!this.showAddressPanel) {
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
    this.residentAddress.addressTypeId = this.residentAddressList[index].address_type_id;
    this.residentAddress.resident_id = this.residentAddressList[index].resident_id;
    this.residentAddress.isNew = this.residentAddressList[index].isNew;
    this.residentAddress.isUpdated = this.residentAddressList[index].isUpdated;
    this.residentAddress.isUsed = this.residentAddressList[index].isUsed;

    if (this.selectedPostCode.length == 0) {
      this.postCodeList.forEach((element, index) => {
          if (element.name == this.residentAddress.postCode) {
            this.selectedPostCode.push(element.id);
          }
        })
    }

    if (this.selectedTypeAddress.length == 0) {
      this.typeAddressList.forEach((element, index) => {
          if (element.name == this.residentAddress.address) {
            this.selectedTypeAddress.push(element.id);
          }
        })
    }
  }

  GoBackToAddressTable() {
    
    this.showEditAddressButton = false;

    if (this.showAddressPanel) {
      this.showAddressPanel = false;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    }

    this.ClearResidentAddressModel();
  }

  SaveAddress() {

    let updatedResidentAddress;
    let newResidentAddress;
    
    if (this.indexSelectedAddress != undefined) {
      this.residentAddress.isUpdated = true;
      updatedResidentAddress = Object.assign({}, this.residentAddress);
      this.residentAddressList[this.indexSelectedAddress] = updatedResidentAddress;
      if(
        (this.residentAddressList[this.indexSelectedAddress].isNew == false || this.residentAddressList[this.indexSelectedAddress].isNew == true) &&
        (this.residentAddressList[this.indexSelectedAddress].isUpdated == true) &&
        (this.residentAddressList[this.indexSelectedAddress].isUsed == true || this.residentAddressList[this.indexSelectedAddress].isUsed == false)
      ){
        this.residentService.UpdateResidentAddressById(this.residentAddressList[this.indexSelectedAddress],
        this.residentAddressList[this.indexSelectedAddress].id)
        .then(response => {
          if(response.isUpdated){
            console.log('zaaktualizowano adres');
            console.log(response);
          }
        })
      }
      
      this.showEditAddressButton = false;
    } else {
      if(this.getResidentId == 0){
        this.residentAddress.isNew = true;
        newResidentAddress = Object.assign({}, this.residentAddress);
        this.residentAddressList.push(newResidentAddress);
      }else{
        this.residentAddress.isNew = true;
        newResidentAddress = Object.assign({}, this.residentAddress);
        newResidentAddress.resident_id = this.getResidentId;
        this.residentService.CreateNewResidentAddress([newResidentAddress])
        .then(response =>{
          if(response.isCreated){
            console.log('utworzono adres');
            newResidentAddress.id = response.newResidentAddresses[0].id;
            this.residentAddressList.push(newResidentAddress);
          }else{
            console.log(response.errorMessage);
          }
        })
      }      
    }

    if (this.showAddressPanel) {
      this.showAddressPanel = false;
      this.emitIsResidentAddressTableOpen.emit(!this.showAddressPanel);
    }

    this.ClearResidentAddressModel();
    
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

  ClearResidentAddressModel() {
    this.residentAddress.id = 0;
    this.residentAddress.country = '';
    this.residentAddress.city = '';
    this.residentAddress.street = '';
    this.residentAddress.houseNumber = '';
    this.residentAddress.apartmentNumber = ''
    this.residentAddress.postCode = '';
    this.residentAddress.address = ''
    this.residentAddress.address_type_id = 0;
    this.residentAddress.isNew = false;
    this.residentAddress.isUpdated = false;
    this.residentAddress.isUsed = false;
    this.selectedPostCode = [];
    this.selectedTypeAddress = [];
    this.previousSelectedPostCode = '';
    this.previousSelectedTypeAddress = '';

  }
}
