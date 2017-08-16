import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Dormitory } from './dormitory';
import { ResidentPersonalData } from './resident/resident-personal-data';

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

    GetResidentsOfCurrentDormitoryById(dormitoryId:number): Promise<ResidentPersonalData[]>{
        
        return this.http.get(this.dormitoryUrl +'/' + dormitoryId.toString() + '/residents')
            .toPromise()
            .then(response => 
                response.json() as ResidentPersonalData[]
            ).catch();
    }
}