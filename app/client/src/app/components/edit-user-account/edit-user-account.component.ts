import { Component, OnInit } from '@angular/core';
import { DormitoryService } from '../../shared/dormitory.service';

@Component({
    selector: 'edit-user-account',
    templateUrl: './edit-user-account.component.html',
    styleUrls: ['./edit-user-account.component.css']
})

export class EditUserAccountComponent implements OnInit{
    
    public choicedDormitory:string;

    constructor(private dormitoryService: DormitoryService){
        
    }
    ngOnInit(){
        
    }
}