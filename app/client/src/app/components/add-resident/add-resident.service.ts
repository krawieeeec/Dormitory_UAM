import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs';


@Injectable(

)

export class AddResidentService{

    private residentPersonalData:object;
    private residentAddress:object;
    private residentDocument:object;
    private residentDormitory:object;
    private residentAccomodation:object;
    private residentId:number;
    private updateList;
    
    constructor(
        private http: Http
    ){
        
        this.residentDocument = {
            release_date: '',
            expiration_date: '',
            issuing_country: '',
            document_type_id: 0,
            resident_id: 0
        }
        this.residentDormitory = {
            name: '',
            adress: ''
        }
        this.residentAccomodation = {
            
        }
        this.updateList = new Subject();
    }
    
    SetResidentId(id):void{
        this.residentId = id;
    }
    GetResidentId():number{
        return this.residentId;
    }

    GetResidentPersonalData():object{
        return this.residentPersonalData;
    }
    SetResidentPersonalData(residentPersonalData:object):void{
        this.residentPersonalData = residentPersonalData;
    }

    GetResidentAddress():object{
        return this.residentAddress;
    }
    SetResidentAddress(residentAddress:object):void{
        this.residentAddress = residentAddress;
    }

    GetUpdateResidentListObservable$(){
        return this.updateList;
    }

}