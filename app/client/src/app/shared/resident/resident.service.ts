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

    private headers;
    private residentUrl;
    
    constructor(private http: Http){ 
        
        this.residentUrl = 'http://localhost:3000/resident';
        this.headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'}) 
    }

    CreateNewResidentPersonalData(newResidentPersonalData): Promise<ResidentPersonalData>{
        return this.http.post(this.residentUrl + '/personalData', newResidentPersonalData)
        .toPromise()
        .then(response =>
            response.json() as ResidentPersonalData)
        .catch();
    }
        
    CreateNewResidentAddress(newResidentAddress): Promise<ResidentAddress>{
        return this.http.post(this.residentUrl + '/address', newResidentAddress)
        .toPromise()
        .then(response =>
            response.json() as ResidentAddress)
        .catch();
    }

    CreateNewResidentDocument(newResidentDocument): Promise<ResidentDocument>{
        return this.http.post(this.residentUrl + '/document', newResidentDocument)
        .toPromise()
        .then(response =>
            response.json() as ResidentDocument)
        .catch();
    }

    CreateNewResidentDormitoryStay(newResidentDormitoryStay): Promise<ResidentDormitory>{
        return this.http.post(this.residentUrl + '/dormitory', newResidentDormitoryStay)
        .toPromise()
        .then(response =>
            response.json() as ResidentDormitory)
        .catch();
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

       GetResidentDocumentsById(residentId): Promise<ResidentDocument>{
           return this.http.get(this.residentUrl + '/' + residentId + '/document')
            .toPromise()
            .then(response => 
                response.json() as ResidentDocument)
            .catch();
       }

    UpdateResidentPersonalDataById(residentPersonalData, residentId): Promise<ResidentPersonalData>{
        return this.http.put(this.residentUrl + '/' + residentId + '/personalData', JSON.stringify(residentPersonalData), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentPersonalData)
            .catch();
    }
    
    UpdateResidentAddressById(residentAddress, addressId): Promise<ResidentAddress>{
        return this.http.put(this.residentUrl + '/' + addressId + '/address', JSON.stringify(residentAddress), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentAddress)
            .catch();
    }
        
    UpdateResidentDocumentById(residentDocument, residentId): Promise<ResidentDocument>{
        return this.http.put(this.residentUrl + '/' + residentId + '/document', JSON.stringify(residentDocument), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentDocument)
            .catch();
    }
     
    UpdateResidentDormitoryById(residentDormitory, residentId): Promise<ResidentDormitory>{
        return this.http.put(this.residentUrl + '/' + residentId + '/dormitory', JSON.stringify(residentDormitory), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  residentDormitory)
            .catch();
    }

    DeleteResidentAddressById(addressId): Promise<ResidentAddress>{
        return this.http.delete(this.residentUrl + '/' + addressId + '/address')
        .toPromise()
        .then(response =>
            response.json() as ResidentAddress)
        .catch();
    }
}