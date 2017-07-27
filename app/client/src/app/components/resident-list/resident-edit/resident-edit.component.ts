import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css']
})
export class ResidentEditComponent implements OnInit {

  @Output() showTable = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) { 

    
  }
  ngOnInit() {
    this.showTable.emit(false);
  }

}
