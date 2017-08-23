import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TypeAddress } from './type-address';

@Injectable(

)

export class TypeAddressService{
    
    private headers;
    private typeAddressUrl;

    constructor(private http: Http){

       
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.typeAddressUrl = 'http://localhost:3000/typeAddress'; 
    }

    GetAllTypeAddress(): Promise<TypeAddress[]>{
        
        return this.http.get(this.typeAddressUrl)
            .toPromise()
            .then(response => 
                response.json() as TypeAddress[]
            ).catch();
    }

    GetTypeAddressById(typeAddressId:number): Promise<TypeAddress[]>{
        
        return this.http.get(this.typeAddressUrl +'/' + typeAddressId.toString())
            .toPromise()
            .then(response => 
                response.json() as TypeAddress[]
            ).catch();
    }
}