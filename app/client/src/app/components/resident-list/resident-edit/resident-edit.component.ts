import { Component, EventEmitter, Output, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';
import { ResidentService } from '../../../shared/resident.service';
import { UserSessionService } from '../../../shared/user-session.service';
import { ResidentEditService } from './resident-edit.service';

@Component({
  selector: 'resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css']
})

export class ResidentEditComponent implements OnInit, DoCheck {

  private resident;
  private residentId;
  private dormitoryId;
  private updateResidentList$;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location, 
    private residentService: ResidentService, 
    private userSessionService: UserSessionService, 
    private residentEditService: ResidentEditService 
  ) { 
    
  }

  ngOnInit() {

    this.residentId = this.route.snapshot.params.id;
    this.residentEditService.SetResidentId(this.residentId);
    this.dormitoryId = this.userSessionService.GetChosenDormitoryId();

    this.updateResidentList$ = this.residentEditService.GetUpdateResidentListObservable$();
  }

  ngDoCheck(){
    //console.log(this.resident);
  }

  GetEditedResident($event):void{
    this.resident = $event;
  }

  EditResidentPersonalData(/*resident, residentId*/):void{
    
    this.residentService.UpdateResident(this.resident, this.residentId)
    .then(() => {
     // this.router.navigate(['/residentList', this.dormitoryId]);
      console.log('UPDATED');
    })
    .catch(error => console.log(error))
    //this.router.navigate(['/residentList', this.dormitoryId]);
    
    this.updateResidentList$.next(true);
    
  }

  GoBack():void{
    //this.location.back();
    this.router.navigate(['residentList', this.dormitoryId]);
 
  }
}
