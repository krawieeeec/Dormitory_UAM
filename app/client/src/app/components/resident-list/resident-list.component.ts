import { Component, OnInit, DoCheck,OnDestroy, OnChanges } from '@angular/core';
import { DormitoryService } from '../../shared/dormitory.service';
import { UserSessionService } from '../../shared/user-session.service';
import { ResidentPersonalData } from '../../shared//resident/resident-personal-data';
import { ActivatedRoute, ParamMap, Router, NavigationStart, ResolveEnd } from '@angular/router';

import { ResidentListService } from './services/resident-list.serivce';
import { Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'resident-list',
    templateUrl: './resident-list.component.html',
    styleUrls: ['./resident-list.component.css'],
})

export class ResidentListComponent implements OnInit, DoCheck, OnDestroy{
    
    private residentsList;
    private copyResidentsList;
    private showList:boolean;
    private nameCurrentDormitory;
    private showResidentSearch;
    private residentSearchedAttributes;
    private residentPreviousSearchedAttributes;

    constructor(
        private route: ActivatedRoute, 
        private router: Router, 
        private dormitoryService : DormitoryService,
        private residentListService: ResidentListService,    
        private userSessionService: UserSessionService
    ){
        
    }

    ngOnInit(): void {
        
        this.showResidentSearch = false;
        this.showList = true;

        this.residentSearchedAttributes = {
            name: '',
            surname: '',
            roomNumber: ''
        }
        this.residentPreviousSearchedAttributes = {
            name: '',
            surname: '',
            roomNumber: ''
        }

        this.nameCurrentDormitory = this.userSessionService.GetChosenDormitoryName();
        this.route.paramMap
        .switchMap((params: ParamMap) => this.dormitoryService.GetResidentsOfCurrentDormitoryById(+params.get('id')))
        .subscribe(residents => {
            if(residents.length == 0){
                this.residentsList = [];
                this.copyResidentsList = [];
            }else{
                this.residentsList = residents;
                this.copyResidentsList = residents;
                console.log(residents);
            }
        });
        
        this.residentListService.GetResidentListObservable$()
        .subscribe(updateResidentList =>{
            if(updateResidentList){
                console.log('POBIERAM');
                this.route.paramMap
                .switchMap((params: ParamMap) => this.dormitoryService.GetResidentsOfCurrentDormitoryById(+params.get('id')))
                .subscribe(residents => {
                    if(residents.length == 0){
                        this.residentsList = [];
                        this.copyResidentsList = []
                    }else{
                        this.residentsList = residents;
                        this.copyResidentsList = residents;
                        console.log(residents);
                    }
                });
            }
        })
    }

    ngDoCheck(){
        this.nameCurrentDormitory = this.userSessionService.GetChosenDormitoryName();

        if(
            (this.router.url.indexOf('/residentBlock') > -1) || 
            (this.router.url.indexOf('/residentEdit') > -1) ||
            (this.router.url.indexOf('/residentAdd') > -1)
        ){
            this.showList = false;

         }else if(
             (this.router.url.indexOf('/residentBlock') == - 1) || 
             (this.router.url.indexOf('/residentEdit') == - 1)  ||
             (this.router.url.indexOf('/residentAdd') == -1) || 
             (this.showList === undefined)
            ){
           this.showList = true;
           
        }
        else{
            this.showList = true;
        }

    }
    ngOnDestroy(){
        console.log('OnDestory')
    }

    ChangeResidentsList(){
        this.residentsList = [];
    }
    
    ShowResidentSearch(){
        
        if(!this.showResidentSearch){
            this.showResidentSearch = true;
        }else{
            this.showResidentSearch = false;
        }
    }

    FindResidentsFromList(){
        let lowerCaseCurrentName = '', lowerCaseCurrentSurname = '', lowerCasePreviousName = '', lowerCasePreviousSurname = '';
        let tempResidentsList = [];

        if(this.residentSearchedAttributes.name.length > 0 && 
            (this.residentSearchedAttributes.name != this.residentPreviousSearchedAttributes.name)){
                
                this.residentPreviousSearchedAttributes.name = this.residentSearchedAttributes.name;
                lowerCaseCurrentName = this.residentSearchedAttributes.name.toLowerCase();

                this.residentsList.forEach(element => {
                    if(this.residentSearchedAttributes.name.length <= element.name.length){
                        if(lowerCaseCurrentName === element.name.substr(0, lowerCaseCurrentName.length).toLowerCase()){
                            tempResidentsList.push(element);
                        }        
                    }    
                });
                this.residentsList = tempResidentsList;
        }else if(this.residentSearchedAttributes.surname.length > 0 && 
            (this.residentSearchedAttributes.surname != this.residentPreviousSearchedAttributes.surname)){
            
                this.residentPreviousSearchedAttributes.surname = this.residentSearchedAttributes.surname;
                lowerCaseCurrentSurname = this.residentSearchedAttributes.surname.toLowerCase();

                this.residentsList.forEach(element => {
                    if(this.residentSearchedAttributes.surname.length <= element.surname.length){
                        if(lowerCaseCurrentSurname === element.surname.substr(0, lowerCaseCurrentSurname.length).toLowerCase()){
                            tempResidentsList.push(element);
                        }
                    }
                });
                this.residentsList = tempResidentsList;
        }else if (this.residentSearchedAttributes.roomNumber.length > 0 &&
            (this.residentSearchedAttributes.roomNumber != this.residentPreviousSearchedAttributes.roomNumber)){
                console.log('roomnumber');
                this.residentPreviousSearchedAttributes.roomNumber = this.residentSearchedAttributes.roomNumber;
                
                this.residentsList.forEach(element => {
                    console.log(element.room_number.toString().length);
                    if(this.residentSearchedAttributes.roomNumber.length <= element.room_number.toString().length){
                        if(this.residentSearchedAttributes.roomNumber === element.room_number.toString().substr(0, this.residentSearchedAttributes.roomNumber.length)){
                            console.log('pasuje');
                            console.log(element);
                            tempResidentsList.push(element);
                        }
                    }
                });
                this.residentsList = tempResidentsList;
        }else if(
            (this.residentSearchedAttributes.name.length == 0 ) && 
            (this.residentSearchedAttributes.surname.length == 0) &&
            (this.residentSearchedAttributes.roomNumber.length == 0)){
                this.residentsList = this.copyResidentsList;
                this.residentPreviousSearchedAttributes = {
                    name: '',
                    surname: '',
                    roomNumber: ''
                }
            }
    }

}