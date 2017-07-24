import { Component, OnInit } from '@angular/core';
import { DormitoryService } from '../../shared/dormitory.service';
import { Dormitory } from '../../shared/dormitory';
import { Router } from '@angular/router'

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    
    private dormitoryList: Dormitory[];
    private dormitoryId: number;

    constructor(private router: Router, private dormitoryService : DormitoryService){

    }
    ngOnInit(): void {
        this.dormitoryService.GetListDormitories()
        .then(dormitories => this.dormitoryList = dormitories);
    }
    SetDormitory(dormitoryName: string, dormitoryId: number){
        this.dormitoryService.SetChoisedDormitory(dormitoryName);
        this.dormitoryId = dormitoryId;
    }

    ShowResidentList(){
        console.log(this.dormitoryService.GetChoicedDormitory());
        console.log(this.dormitoryId);
        this.router.navigate(['./residentList', this.dormitoryId])
    }
}