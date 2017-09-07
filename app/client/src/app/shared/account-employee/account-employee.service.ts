import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

import { AccountEmployee } from './account-employee';
import 'rxjs/add/operator/toPromise';

@Injectable(

)

export class AccountEmployeeService{

    private headers;
    private accountEmployeeUrl;
    
    constructor(private http: Http){ 
        
        this.accountEmployeeUrl = 'http://localhost:3000/AccountEmployee';
        this.headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'}) 
    }

    GetAllAccountEmployees(): Promise<AccountEmployee[]>{
        return this.http.get(this.accountEmployeeUrl)
            .toPromise()
            .then(response => 
                response.json() as AccountEmployee[])
            .catch();
    }
    
    GetAccountEmployeeById(accountEmployeeId): Promise<AccountEmployee[]>{
        return this.http.get(this.accountEmployeeUrl + '/' + accountEmployeeId )
            .toPromise()
            .then(response =>
                response.json() as AccountEmployee[])
            .catch();
    }
    
    CreateNewAccountEmployee(newAccountEmployee): Promise<AccountEmployee>{
        return this.http.post(this.accountEmployeeUrl , newAccountEmployee)
        .toPromise()
        .then(response =>
            response.json() as AccountEmployee)
        .catch();
    }
    
}