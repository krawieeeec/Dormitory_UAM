import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BlockadeHistory } from './blockade-history';

@Injectable(

)

export class BlockadeHistoryService{
    
    private headers;
    private blockadeHistoryUrl;

    constructor(private http: Http){

       
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.blockadeHistoryUrl = 'http://localhost:3000/residentAccount'; 
    }

    GetAllBlockadeHistory(): Promise<BlockadeHistory[]>{
        
        return this.http.get(this.blockadeHistoryUrl+'/blockadeHistory')
            .toPromise()
            .then(response => 
                response.json() as BlockadeHistory[]
            ).catch();
    }

    GetAllResidentAccountBlockadeHistoryById(accountResidentId:number): Promise<BlockadeHistory[]>{
        
        return this.http.get(this.blockadeHistoryUrl + '/' + accountResidentId.toString() + '/blockadeHistory')
            .toPromise()
            .then(response => 
                response.json() as BlockadeHistory[]
            ).catch();
    }
}