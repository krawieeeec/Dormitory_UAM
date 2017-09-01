import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ResidentStay } from './resident-stay';

@Injectable(

)

export class ResidentStayService{
    
    private headers;
    private residentStayUrl;

    constructor(private http: Http){

       
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.residentStayUrl = 'http://localhost:3000/resident'; 
    }

    GetAllResidentStays(): Promise<ResidentStay[]>{
        
        return this.http.get(this.residentStayUrl + '/stay')
            .toPromise()
            .then(response => 
                response.json() as ResidentStay[]
            ).catch();
    }

    GetResidentStayById(residentId:number): Promise<ResidentStay>{
        
        return this.http.get(this.residentStayUrl +'/' + residentId.toString() + '/stay')
            .toPromise()
            .then(response => 
                response.json() as ResidentStay
            ).catch();
    }
}