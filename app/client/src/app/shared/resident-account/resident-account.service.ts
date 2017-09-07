import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ResidentAccount } from './resident-account';

@Injectable(

)

export class ResidentAccountService{
    
    private headers;
    private residentAccountUrl;
    private residentUrl;

    constructor(private http: Http){

        this.headers = new Headers({'Content-Type': 'application/json'});
        this.residentAccountUrl = 'http://localhost:3000/resident/account';
        this.residentUrl = 'http://localhost:3000/resident'
    }

    GetAllResidentAccounts(): Promise<ResidentAccount[]>{
        
        return this.http.get(this.residentAccountUrl)
            .toPromise()
            .then(response => 
                response.json() as ResidentAccount[]
            ).catch();
    }

    CreateNewResidentAccount(newResidentAccount): Promise<ResidentAccount>{

        return this.http.post(this.residentAccountUrl, newResidentAccount)
        .toPromise()
        .then(response =>
            response.json() as ResidentAccount)
        .catch();
    }

    GetResidentAccountsById(residentId:number): Promise<ResidentAccount[]>{
        
        return this.http.get(this.residentUrl +'/' + residentId.toString() + '/account')
            .toPromise()
            .then(response => 
                response.json() as ResidentAccount[]
            ).catch();
    }

    GetResidentAccountCurrentDormitoryById(residentId:number, dormitoryId:number): Promise<any[]>{
        
        return this.http.get(this.residentUrl +'/' + residentId.toString() + '/account/' + dormitoryId.toString())
            .toPromise()
            .then(response => 
                response.json() as any[]
            ).catch();
    }
    UpdateResidentAccountById(residentId:number, dormitoryId:number, newResidentAccount): Promise<any[]>{
        
        return this.http.put(this.residentUrl +'/' + residentId.toString() + '/account/' + dormitoryId.toString(), newResidentAccount)
            .toPromise()
            .then(response => 
                response.json() as any[]
            ).catch();
    }

}