import { Component, EventEmitter, Output, OnInit, OnChanges, DoCheck, Input } from '@angular/core';

import { NgModel } from '@angular/forms';

import { ResidentService } from '../../../../shared/resident/resident.service';
import { ResidentEditService } from '../resident-edit.service';

@Component({
  selector: 'resident-document',
  templateUrl: './resident-document.component.html',
  styleUrls: ['./resident-document.component.css']
})
export class ResidentDocumentComponent implements OnInit, OnChanges, DoCheck {

  private residentDocument;
  @Input() switchInputs;
  @Input() residentId:number;
  @Output() emitResidentDocument;

  constructor(
    private residentService: ResidentService,
    private residentEditService: ResidentEditService
  ) {
    this.residentDocument = {
            releaseDate: '',
            expirationDate: '',
            issuingCountry: '',
            typeDocument: ''
        }
    this.emitResidentDocument = new EventEmitter<object>();
  }

  ngOnInit() {

    this.residentService.GetResidentDocumentById(this.residentId)
      .then(residentDocument =>{
        this.residentDocument.releaseDate = residentDocument[0].release_date;
        this.residentDocument.expirationDate = residentDocument[0].expiration_date;
        this.residentDocument.issuingCountry = residentDocument[0].issuing_country;
        this.residentDocument.typeDocument = residentDocument[0].type_document;
      })
  
  }
  

  ngOnChanges(){

  }
  
  ngDoCheck(){
    this.emitResidentDocument.emit(this.residentDocument);
  }

}
