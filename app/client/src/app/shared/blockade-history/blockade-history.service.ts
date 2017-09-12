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
        
        return this.http.get(this.blockadeHistoryUrl + '/blockadeHistory')
            .toPromise()
            .then(response => 
                response.json() as BlockadeHistory[]
            ).catch();
    }

    GetAllResidentAccountBlockadeHistoryById(residentId:number, dormitoryId:number): Promise<BlockadeHistory[]>{
        
        return this.http.get(this.blockadeHistoryUrl + '/' + residentId.toString() + '/blockadeHistory/' + dormitoryId)
            .toPromise()
            .then(response => 
                response.json() as BlockadeHistory[]
            ).catch();
    }

    CreateNewAccountResidentBlockade(newAccountResidentBlockade): Promise<BlockadeHistory>{
        return this.http.post(this.blockadeHistoryUrl + '/blockadeHistory', newAccountResidentBlockade)
        .toPromise()
        .then(response =>
            response.json() as BlockadeHistory)
        .catch();
    }

    UpdateResidentAccountBlockadeById(blockadeId, newResidentAccountBlockade): Promise<any[]>{
        
        return this.http.put(this.blockadeHistoryUrl +'/' + blockadeId.toString() + '/blockadeHistory' , newResidentAccountBlockade)
            .toPromise()
            .then(response => 
                response.json() as any[]
            ).catch();
    }

    DeleteAccountResidentBlockadeById(accountResidentBlockadeId): Promise<BlockadeHistory>{
        return this.http.delete(this.blockadeHistoryUrl + '/' + accountResidentBlockadeId + '/blockadeHistory')
        .toPromise()
        .then(response =>
            response.json() as BlockadeHistory)
        .catch();
    }
}