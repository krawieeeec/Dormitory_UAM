import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

import { Resident} from './resident';
import 'rxjs/add/operator/toPromise';

@Injectable(

)

export class ResidentService{

    private headers = new Headers({'Content-Type': 'application/json'});
    private residentUrl = 'http://localhost:3000/resident';

    constructor(private http: Http){ 

    }

    GetResidents(): Promise<Resident[]>{
        return this.http.get(this.residentUrl)
            .toPromise()
            .then(response => 
                response.json() as Resident[])
            .catch();
    }
    
    GetResidentById(residentId): Promise<Resident>{
        return this.http.get(this.residentUrl+'/'+residentId)
            .toPromise()
            .then(response =>
                response.json() as Resident)
            .catch();
    }
    
}