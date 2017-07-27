import { Component, OnInit, DoCheck } from '@angular/core';
import { DormitoryService } from '../../shared/dormitory.service';
import { Resident } from '../../shared/resident';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'resident-list',
    templateUrl: './resident-list.component.html',
    styleUrls: ['./resident-list.component.css'],
})

export class ResidentListComponent implements OnInit, DoCheck{
    
    private residentsList: Resident[];
    private showTable:boolean;

    constructor(private route: ActivatedRoute, private router: Router, private dormitoryService : DormitoryService){

    }

    ngOnInit(): void {
        this.showTable = true;
        this.route.paramMap
        .switchMap((params: ParamMap) => this.dormitoryService.GetResidentsOfCurrentDormitory(+params.get('id')))
        .subscribe(residents => {
            if(residents.length == 0){
                this.residentsList = [];
            }else{
                this.residentsList = residents
            }
        });
    }

    ngDoCheck(){
        
        if(this.router.url.indexOf('/edit') > -1){
            this.showTable = false;
         }else if((this.router.url.indexOf('/edit') == - 1)  || (this.showTable === undefined)){
            this.showTable = true;
        }
        else{
            true;
        }
        
    }

    ShowTable(){
        if(this.showTable){
            this.showTable = false;
        }
    }
}