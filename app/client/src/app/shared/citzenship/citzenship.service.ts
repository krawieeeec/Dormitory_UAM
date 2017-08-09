import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

import { Citzenship } from './citzenship';
import 'rxjs/add/operator/toPromise';

@Injectable(

)

export class CitzenshipService{

    private headers = new Headers({'Content-Type': 'application/json'});
    private citzenshipUrl = "http://localhost:3000/citzenship";

    constructor(private http: Http){ 

    }

    GetAllCitzenships(): Promise<Citzenship[]>{
        return this.http.get(this.citzenshipUrl)
            .toPromise()
            .then(response => 
                response.json() as Citzenship[])
            .catch();
    }
    
    GetCitzenshipById(citzenshipId): Promise<Citzenship>{
        return this.http.get(this.citzenshipUrl + '/' + citzenshipId)
            .toPromise()
            .then(response => 
                response.json() as Citzenship)
            .catch();
    }

  
}