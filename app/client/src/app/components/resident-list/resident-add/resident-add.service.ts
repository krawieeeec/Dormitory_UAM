import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs';

import { ResidentAddress } from '../../../shared/resident/resident-address';

@Injectable(

)

export class ResidentAddService{

    constructor(
        private http: Http
    )
    {
    
        
    }
 
}