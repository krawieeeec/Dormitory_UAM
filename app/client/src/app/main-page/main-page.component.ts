import { Component, OnInit } from '@angular/core';
import { DormitoryService } from '../shared/dormitory.service';
import { Dormitory } from '../shared/dormitory';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit{
    
    private dormitoryList: Dormitory[];

    constructor(private dormitoryService : DormitoryService){

    }
    ngOnInit(): void {
        this.dormitoryService.GetListDormitories()
        .then(dormitories => this.dormitoryList = dormitories);
    }
    SetDormitory(dormitory: string){
        this.dormitoryService.SetChoisedDormitory(dormitory);
    }
}