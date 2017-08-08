import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Dormitory } from './dormitory';
import { Resident } from './resident';

@Injectable(

)

export class DormitoryService{
    
    private headers;
    private dormitoryUrl;

    constructor(private http: Http){

       
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.dormitoryUrl = 'http://localhost:3000/dormitory'; 
    }

    GetListDormitories(): Promise<Dormitory[]>{
        
        return this.http.get(this.dormitoryUrl)
            .toPromise()
            .then(response => 
                response.json() as Dormitory[]
            ).catch();
    }

    GetResidentsOfCurrentDormitoryById(dormitoryId:number): Promise<Resident[]>{
        
        return this.http.get(this.dormitoryUrl +'/' + dormitoryId.toString())
            .toPromise()
            .then(response => 
                response.json() as Resident[]
            ).catch();
    }
}