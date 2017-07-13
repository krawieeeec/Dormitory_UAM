import { Component } from '@angular/core';

import { ResidentService } from '../shared/resident.service';
import { Resident} from '../shared/resident';

@Component({
    selector: 'search-resident',
    templateUrl: 'search-resident.component.html',
    styleUrls: ['./search-resident.component.css']
})

export class SearchResidentComponent{
    residents: Resident[];

    constructor(private residentService: ResidentService){

    }

    getResidents(): void {
        this.residentService.getResidents()
            .then(residents => {
                this.residents = residents;
            });
    }
}