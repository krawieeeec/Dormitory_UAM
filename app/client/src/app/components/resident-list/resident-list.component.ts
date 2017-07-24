import { Component, OnInit,DoCheck } from '@angular/core';
import { DormitoryService } from '../../shared/dormitory.service';
import { Resident } from '../../shared/resident';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'resident-list',
    templateUrl: './resident-list.component.html',
    styleUrls: ['./resident-list.component.css']
})

export class ResidentListComponent implements OnInit{
    
    private residentsList: Resident[];

    constructor(private route: ActivatedRoute, private router: Router, private dormitoryService : DormitoryService){

    }

    ngOnInit(): void {
        this.route.paramMap
    .switchMap((params: ParamMap) => this.dormitoryService.GetResidentsOfCurrentDormitory(+params.get('id')))
    .subscribe(residents => this.residentsList = residents);
    }

    DetailResident(residentId: number): void{
        this.router.navigate(['/addResident']);
    }
}