import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

import { ResidentPersonalData } from './resident-personal-data';
import { ResidentAddress } from './resident-address';
import { ResidentDormitory } from './resident-dormitory';
import { ResidentDocument } from './resident-document';
import 'rxjs/add/operator/toPromise';

@Injectable(

)

export class ResidentService{

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'});
    private residentUrl = 'http://localhost:3000/resident';
    private residentDormitoryUrl = 'http://localhost:3000/residentStay';
    private residentDocumentUrl = 'http://localhost:3000/document';
    
    constructor(private http: Http){ 

    }

    GetResidents(): Promise<ResidentPersonalData[]>{
        return this.http.get(this.residentUrl)
            .toPromise()
            .then(response => 
                response.json() as ResidentPersonalData[])
            .catch();
    }
    
    GetResidentPersonalDataById(residentId): Promise<ResidentPersonalData[]>{
        return this.http.get(this.residentUrl + '/' + residentId + '/personalData')
            .toPromise()
            .then(response =>
                response.json() as ResidentPersonalData[])
            .catch();
    }
    
      GetResidentAddressById(residentId): Promise<ResidentAddress>{
          return this.http.get(this.residentUrl + '/' + residentId + '/address')
            .toPromise()
            .then(response =>
                response.json() as ResidentAddress)
            .catch();
       }

       GetResidentStayById(residentId): Promise<ResidentDormitory>{
            return this.http.get(this.residentUrl + '/' + residentId+ '/dormitory')
                .toPromise()
                .then(response => 
                    response.json() as ResidentDormitory)
                .catch();
       }

       GetResidentDocumentById(residentId): Promise<ResidentDocument>{
           return this.http.get(this.residentUrl + '/' + residentId + '/document')
            .toPromise()
            .then(response => 
                response.json() as ResidentDocument)
            .catch();
       }

    UpdateResidentPersonalData(residentPersonalData, residentId): Promise<ResidentPersonalData>{
        return this.http.put(this.residentUrl + '/' + residentId + '/update', JSON.stringify(residentPersonalData), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentPersonalData)
            .catch();
    }
    
    UpdateResidentAddress(residentAddress, residentId): Promise<ResidentAddress>{
        return this.http.put(this.residentUrl + '/' + residentId + '/address', JSON.stringify(residentAddress), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentAddress)
            .catch();
    }
        
    UpdateResidentDocument(residentDocument, residentId): Promise<ResidentDocument>{
        return this.http.put(this.residentUrl + '/' + residentId + '/document', JSON.stringify(residentDocument), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentDocument)
            .catch();
    }
     
    UpdateResidentDormitory(residentDormitory, residentId): Promise<ResidentDormitory>{
        return this.http.put(this.residentUrl + '/' + residentId + '/dormitory', JSON.stringify(residentDormitory), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentDormitory)
            .catch();
    }
}