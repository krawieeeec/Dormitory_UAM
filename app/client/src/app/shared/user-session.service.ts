import { Injectable, OnInit } from '@angular/core';


@Injectable(

)

export class UserSessionService implements OnInit{
    
    private chosenDormitoryName: string;
    private chosenDormitoryId: string;

    constructor(){
        this.chosenDormitoryName = "";
        this.chosenDormitoryId = "";
    }

    ngOnInit(){
        this.chosenDormitoryName = this.GetChosenDormitoryName();
        this.chosenDormitoryId = this.GetChosenDormitoryId();
    }

    SetChosenDormitory(dormitoryName: string, dormitoryId: string){
        sessionStorage.setItem('chosenDormitoryName', dormitoryName);
        sessionStorage.setItem('chosenDormitoryId', dormitoryId);
    }

    GetChosenDormitoryName():string{
        if(sessionStorage.getItem('chosenDormitoryName') == null){
            sessionStorage.setItem('chosenDormitoryName', 'Brak');
            return sessionStorage.getItem('chosenDormitoryName');
        } else{
            return sessionStorage.getItem('chosenDormitoryName');    
        }
        
    }
    GetChosenDormitoryId(): string{
        return sessionStorage.getItem('chosenDormitoryId');
    }

}