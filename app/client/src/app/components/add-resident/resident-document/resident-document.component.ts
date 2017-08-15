import { Component, EventEmitter, Output, OnInit, OnChanges, DoCheck, Input } from '@angular/core';

import { NgModel } from '@angular/forms';

import { ResidentService } from '../../../shared/resident/resident.service';
import { AddResidentService } from '../add-resident.service';

@Component({
  selector: 'resident-document',
  templateUrl: './resident-document.component.html',
  styleUrls: ['./resident-document.component.css']
})
export class ResidentDocumentComponent implements OnInit, OnChanges, DoCheck {

  private residentDocument;
  @Output() emitResidentDocument;

  constructor(
    private residentService: ResidentService,
    private residentAddService: AddResidentService
  ) {
    this.residentDocument = {
      releaseDate: '',
      expirationDate: '',
      issuingCountry: '',
      typeDocument: '',
      documentTypeId: 1,
      residentId: 0
    }
    this.emitResidentDocument = new EventEmitter<object>();
  }

  ngOnInit() {  
  }
  
  ngOnChanges(){
  }

  ngDoCheck(){
    this.emitResidentDocument.emit(this.residentDocument);
  }

}
