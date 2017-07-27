import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'resident-dormitory',
  templateUrl: './resident-dormitory.component.html',
  styleUrls: ['./resident-dormitory.component.css']
})
export class ResidentDormitoryComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { 

    
  }
  ngOnInit() {
    
  }

}
