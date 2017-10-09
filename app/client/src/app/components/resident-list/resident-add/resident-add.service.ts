import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs';

import { ResidentAddress } from '../../../shared/resident/resident-address';

@Injectable(

)

export class ResidentAddService{

    private updateResidentList$;

    constructor(
        private http: Http
    )
    {
    
        this.updateResidentList$ = new Subject();
    }
 
}