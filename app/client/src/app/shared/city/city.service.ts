import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { City } from './city';

@Injectable(

)

export class CityService{
    
    private headers;
    private cityUrl;

    constructor(private http: Http){

       
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.cityUrl = 'http://localhost:3000/city'; 
    }

    GetAllCities(): Promise<City[]>{
        
        return this.http.get(this.cityUrl)
            .toPromise()
            .then(response => 
                response.json() as City[]
            ).catch();
    }

    GetCityById(cityId:number): Promise<City[]>{
        
        return this.http.get(this.cityUrl +'/' + cityId.toString())
            .toPromise()
            .then(response => 
                response.json() as City[]
            ).catch();
    }
}