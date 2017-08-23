import { Component, OnInit } from '@angular/core';
import {DormitoryService} from './shared/dormitory.service';
import {UserSessionService} from './shared/user-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  private chosenDormitoryName: string;

  constructor(
    private dormitoryService: DormitoryService, 
    private userSessionService: UserSessionService) {
}

  ngOnInit(){
    this.chosenDormitoryName = this.userSessionService.GetChosenDormitoryName();
  }

  GetChosenDormitory(dormitoryName: string){
    this.chosenDormitoryName = dormitoryName;  
  }

  
}
