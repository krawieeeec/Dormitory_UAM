import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident.service';

@Component({
  selector: 'resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css']
})
export class ResidentEditComponent implements OnInit {

  private residentId;

  @Output() showTable = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) { 

  }
  ngOnInit() {

    this.showTable.emit(false);
    this.residentId = this.route.snapshot.params.id;
    
  }

  GoBack():void{
    this.location.back();
  }
}
