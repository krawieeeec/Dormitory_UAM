import { Component } from '@angular/core';

import { ResidentService } from '../../shared//resident/resident.service';
import { ResidentPersonalData } from '../../shared//resident/resident-personal-data';
@Component({
    selector: 'search-resident',
    templateUrl: 'search-resident.component.html'
})

export class SearchResidentComponent{
    residents: ResidentPersonalData [];

    constructor(private residentService: ResidentService){

    }

    getResidents(): void {
        this.residentService.GetResidents()
            .then(residents => {
                this.residents = residents;
            });
    }
}