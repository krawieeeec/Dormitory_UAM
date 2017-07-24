import { Injectable } from '@angular/core';
import { Dormitory } from './dormitory';
import { Resident } from './resident';
import { Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable(

)

export class DormitoryService{
    
    public choisedDormitory;
    private headers;
    private dormitoryUrl;

    constructor(private http: Http){

        this.choisedDormitory = window.localStorage;
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.dormitoryUrl = 'http://localhost:3000/dormitory'; 
    }

    SetChoisedDormitory(dormitory: string){
        console.log(dormitory);
        localStorage.setItem('choisedDormitory', dormitory);
    }

    GetChoicedDormitory():string{
        return localStorage.getItem('choisedDormitory');
    }
    
    GetListDormitories(): Promise<Dormitory[]>{
        return this.http.get(this.dormitoryUrl)
            .toPromise()
            .then(response => 
                response.json() as Dormitory[]
            ).catch();
    }

    GetResidentsOfCurrentDormitory(dormitoryId:number): Promise<Resident[]>{
        console.log(dormitoryId);
        console.log('dawid');
        return this.http.get(this.dormitoryUrl +'/' + dormitoryId.toString())
            .toPromise()
            .then(response => 
                response.json() as Resident[]
            ).catch();
    }
}