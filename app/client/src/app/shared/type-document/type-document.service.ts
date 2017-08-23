import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TypeDocument } from './type-document';

@Injectable(

)

export class TypeDocumentService{
    
    private headers;
    private typeDocumentUrl;

    constructor(private http: Http){

       
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.typeDocumentUrl = 'http://localhost:3000/typeDocument'; 
    }

    GetAllTypeDocuments(): Promise<TypeDocument[]>{
        
        return this.http.get(this.typeDocumentUrl)
            .toPromise()
            .then(response => 
                response.json() as TypeDocument[]
            ).catch();
    }

    GetTypeDocumentById(typeDocumentId:number): Promise<TypeDocument[]>{
        
        return this.http.get(this.typeDocumentUrl +'/' + typeDocumentId.toString())
            .toPromise()
            .then(response => 
                response.json() as TypeDocument[]
            ).catch();
    }
}