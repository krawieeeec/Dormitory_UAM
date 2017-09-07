import { Component, OnInit } from '@angular/core';
import {DormitoryService} from './shared/dormitory.service';
import {UserSessionService} from './shared/user-session.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  private chosenDormitoryName: string;
  private dormitoryList;
  private chosenDormitoryId: string;

  constructor(
    private router: Router,
    private dormitoryService: DormitoryService, 
    private userSessionService: UserSessionService) {
}

  ngOnInit(){
    this.chosenDormitoryName = this.userSessionService.GetChosenDormitoryName();
    this.dormitoryService.GetListDormitories()
    .then(dormitories => this.dormitoryList = dormitories);
  }


  SetDormitory(dormitoryName: string, dormitoryId: string){
    this.chosenDormitoryId = dormitoryId;
    this.chosenDormitoryName = dormitoryName;
    this.userSessionService.SetChosenDormitory(dormitoryName, dormitoryId);

}

  ShowResidentList(){
    if(!(this.chosenDormitoryId == null)){
        this.router.navigate(['./residentList', this.chosenDormitoryId])
    }
}
}
