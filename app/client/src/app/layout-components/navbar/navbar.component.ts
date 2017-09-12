import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserSessionService } from '../../shared/user-session.service';
import { Router } from '@angular/router'

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    
    private chosenDormitoryId: string;

    constructor(
        private router: Router,
        private userSessionService: UserSessionService){
        
    }

    ngOnInit(): void {

        this.chosenDormitoryId = this.userSessionService.GetChosenDormitoryId();
    }

    ShowResidentList(){
        this.chosenDormitoryId = this.userSessionService.GetChosenDormitoryId();
        if(!(this.chosenDormitoryId == null)){
            this.router.navigate(['./residentList', this.chosenDormitoryId])
            // location.reload();
        }
    }
}