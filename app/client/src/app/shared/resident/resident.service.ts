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

    private headers = new Headers({'Content-Type': 'application/json'});
    private residentPersonalDataUrl = 'http://localhost:3000/resident';
    private residentAddressUrl = 'http://localhost:3000/residentAddress';
    private residentDormitoryUrl = 'http://localhost:3000/residentStay';
    private residentDocumentUrl = 'http://localhost:3000/document';
    
    constructor(private http: Http){ 

    }

    GetResidents(): Promise<ResidentPersonalData[]>{
        return this.http.get(this.residentPersonalDataUrl)
            .toPromise()
            .then(response => 
                response.json() as ResidentPersonalData[])
            .catch();
    }
    
    GetResidentPersonalDataById(residentId): Promise<ResidentPersonalData>{
        return this.http.get(this.residentPersonalDataUrl+'/'+residentId)
            .toPromise()
            .then(response =>
                response.json() as ResidentPersonalData)
            .catch();
    }
    
      GetResidentAddressById(residentId): Promise<ResidentAddress>{
          return this.http.get(this.residentAddressUrl+'/'+residentId)
            .toPromise()
            .then(response =>
                response.json() as ResidentAddress)
            .catch();
       }

       GetResidentStayById(residentId): Promise<ResidentDormitory>{
            return this.http.get(this.residentDormitoryUrl+'/'+ residentId)
                .toPromise()
                .then(response => 
                    response.json() as ResidentDormitory)
                .catch();
       }

       GetResidentDocumentById(residentId): Promise<ResidentDocument>{
           return this.http.get(this.residentDocumentUrl+'/'+residentId)
            .toPromise()
            .then(response => 
                response.json() as ResidentDocument)
            .catch();
       }

    UpdateResident(resident, residentId): Promise<ResidentPersonalData>{
        console.log(resident);
        return this.http.put(this.residentPersonalDataUrl +'/'+ residentId +'/update', JSON.stringify(resident), 
        {headers: this.headers})
            .toPromise()
            .then(() =>  resident)
            .catch();
    }
}