import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs';


@Injectable(

)

export class ResidentEditService{

    private updateResidentList$;
    
    constructor(
        private http: Http
    )
    {
        
        this.updateResidentList$ = new Subject();
    }

    

}