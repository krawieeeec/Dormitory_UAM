import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DormitoryService } from '../../shared/dormitory.service';
import { UserSessionService } from '../../shared/user-session.service';
import { Dormitory } from '../../shared/dormitory';
import { Router } from '@angular/router'

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    
    @Output() chosenDormitoryName = new EventEmitter<string>(); 

    private dormitoryList: Dormitory[];
    private chosenDormitoryId: string;

    constructor(private router: Router, private dormitoryService : DormitoryService, private userSession: UserSessionService){
        
    }
    ngOnInit(): void {

        this.chosenDormitoryId = this.userSession.GetChosenDormitoryId();
        this.chosenDormitoryName.emit(this.userSession.GetChosenDormitoryName());
        this.dormitoryService.GetListDormitories()
        .then(dormitories => this.dormitoryList = dormitories);
    }

    SetDormitory(dormitoryName: string, dormitoryId: string){
        this.chosenDormitoryName.emit(dormitoryName);
        this.userSession.SetChosenDormitory(dormitoryName, dormitoryId);
        this.chosenDormitoryId = this.userSession.GetChosenDormitoryId();
    }

    ShowResidentList(){
        if(!(this.chosenDormitoryId == null)){
            this.router.navigate(['./residentList', this.chosenDormitoryId])
        }
    }
}