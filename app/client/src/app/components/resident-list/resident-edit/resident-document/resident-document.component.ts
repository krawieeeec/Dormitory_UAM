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

  private residentDocument:object;
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
            document_type_id: 0,
            resident_id: 0
        }
    this.emitResidentDocument = new EventEmitter<object>();
  }

  ngOnInit() {

    this.residentService.GetResidentDocumentById(this.residentId)
      .then(residentDocument =>{
        this.residentDocument = residentDocument;
        console.log(this.residentDocument);
      })
      
  }
  

  ngOnChanges(){

  }
  
  ngDoCheck(){

  }

}
