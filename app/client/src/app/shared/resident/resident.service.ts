import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { ResidentPersonalData } from './resident-personal-data';
import { ResidentAddress } from './resident-address';
import { ResidentDormitory } from './resident-dormitory';
import { ResidentDocument } from './resident-document';
import { ResidentSearch } from './resident-search';
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

    CreateNewResidentPersonalData(newResidentPersonalData): Promise<any>{
        return this.http.post(this.residentUrl + '/personalData', newResidentPersonalData)
        .toPromise()
        .then(response =>
            response.json() as any)
        .catch();
    }
        
    CreateNewResidentAddress(newResidentAddressList): Promise<any>{
        return this.http.post(this.residentUrl + '/address', newResidentAddressList)
        .toPromise()
        .then(response =>
            response.json() as any)
        .catch();
    }

    CreateNewResidentDocument(newResidentDocumentList): Promise<any>{
        return this.http.post(this.residentUrl + '/document', newResidentDocumentList)
        .toPromise()
        .then(response =>
            response.json() as any )
        .catch();
    }

    CreateNewResidentDormitoryStay(newResidentDormitoryStay): Promise<any>{
        return this.http.post(this.residentUrl + '/dormitory', newResidentDormitoryStay)
        .toPromise()
        .then(response =>
            response.json() as any)
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

    GetResidentStayById(residentStayId): Promise<any>{
        return this.http.get(this.residentUrl + '/' + residentStayId + '/dormitory')
            .toPromise()
            .then(response => 
                response.json() as any)
            .catch();
    }

    GetResidentDocumentsById(residentId): Promise<ResidentDocument>{
        return this.http.get(this.residentUrl + '/' + residentId + '/document')
            .toPromise()
            .then(response => 
                response.json() as ResidentDocument)
            .catch();
    }

    UpdateResidentPersonalDataById(residentPersonalData, residentId): Promise<any>{
        return this.http.put(this.residentUrl + '/' + residentId + '/personalData', JSON.stringify(residentPersonalData), 
        {headers: this.headers})
            .toPromise()
            .then((response) => response.json())
            .catch();
    }
    
    UpdateResidentAddressById(residentAddress): Promise<any>{
        return this.http.put(this.residentUrl + '/address', JSON.stringify(residentAddress), 
        {headers: this.headers})
            .toPromise()
            .then((response) =>  response.json())
            .catch();
    }
        
    UpdateResidentDocumentById(residentDocument): Promise<any>{
        return this.http.put(this.residentUrl + '/document', JSON.stringify(residentDocument), 
        {headers: this.headers})
            .toPromise()
            .then((response) =>  response.json())
            .catch();
    }
     
    UpdateResidentDormitoryById(residentDormitory, residentId): Promise<ResidentDormitory>{
        return this.http.put(this.residentUrl + '/' + residentId + '/dormitory', JSON.stringify(residentDormitory), 
        {headers: this.headers})
            .toPromise()
            .then((response) =>  response.json())
            .catch();
    }

    DeleteResidentAddressById(addressId): Promise<ResidentAddress>{
        return this.http.delete(this.residentUrl + '/' + addressId + '/address')
        .toPromise()
        .then(response =>
            response.json() as ResidentAddress)
        .catch();
    }

    DeleteResidentDocumentById(documentId): Promise<ResidentDocument>{
        return this.http.delete(this.residentUrl + '/' + documentId + '/document')
        .toPromise()
        .then(response =>
            response.json() as ResidentDocument)
        .catch();
    }

    SearchResident(searchedAttributes): Promise<any>{
        return this.http.post(this.residentUrl + '/search', searchedAttributes)
        .toPromise()
        .then(response =>
            response.json() as any )
        .catch();
    }

    FindExistingResident(searchedAttributes): Promise<any>{
        return this.http.post(this.residentUrl + '/exist', searchedAttributes)
        .toPromise()
        .then(response =>
            response.json() as any )
        .catch();
    }
}