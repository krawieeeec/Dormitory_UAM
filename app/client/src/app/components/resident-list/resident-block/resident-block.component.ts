import { Component, EventEmitter, Input, Output, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'resident-block',
  templateUrl: './resident-block.component.html',
  styleUrls: ['./resident-block.component.css']
})

export class ResidentBlockComponent implements OnInit, DoCheck, OnChanges {

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location, 
  ) 
  { 
  }

  ngOnInit() {
  }

  ngDoCheck(){
  }

  ngOnChanges(){
  
  }




}
