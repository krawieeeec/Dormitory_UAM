import { Component, OnInit, DoCheck,OnDestroy } from '@angular/core';
import { DormitoryService } from '../../shared/dormitory.service';
import { ResidentPersonalData } from '../../shared//resident/resident-personal-data';
import { ActivatedRoute, ParamMap, Router, NavigationStart, ResolveEnd } from '@angular/router';
import { ResidentEditService } from './resident-edit/resident-edit.service';

import { Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'resident-list',
    templateUrl: './resident-list.component.html',
    styleUrls: ['./resident-list.component.css'],
})

export class ResidentListComponent implements OnInit, DoCheck, OnDestroy{
    
    private residentsList: ResidentPersonalData[];
    private showTable:boolean;
    private updateResidentList$;

    constructor(
        private route: ActivatedRoute, 
        private router: Router, 
        private dormitoryService : DormitoryService,
        private residentEditService: ResidentEditService
    ){
        
    }

    ngOnInit(): void {
        
        this.showTable = true;
        this.route.paramMap
        .switchMap((params: ParamMap) => this.dormitoryService.GetResidentsOfCurrentDormitoryById(+params.get('id')))
        .subscribe(residents => {
            if(residents.length == 0){
                this.residentsList = [];
            }else{
                this.residentsList = residents;
            }
        });
        
        this.updateResidentList$ = this.residentEditService.GetUpdateResidentListObservable$();
        this.updateResidentList$.subscribe( updateResidentList => 
            {
                if(updateResidentList){
                    this.route.paramMap
                    .switchMap((params: ParamMap) => this.dormitoryService.GetResidentsOfCurrentDormitoryById(+params.get('id')))
                    .subscribe(residents => {
                        if(residents.length == 0){
                            this.residentsList = [];
                        }else{
                            this.residentsList = residents;
                           // location.reload();
                        }
                    });
                }
            }
        );
        
       
    }

    ngDoCheck(){
      if(this.router.url.indexOf('/residentEdit') > -1){
            this.showTable = false;

         }else if((this.router.url.indexOf('/residentEdit') == - 1)  || (this.showTable === undefined)){
           this.showTable = true;
           
        }
        else{
            this.showTable = true;
        }

    }
    ngOnDestroy(){
        console.log('OnDestory')
    }
    
}