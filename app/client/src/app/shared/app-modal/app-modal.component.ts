import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  residentPersonalData:object;
  residentAddress:object;
  residentDocument:object;
}
@Component({  
    selector: 'app-modal',
    templateUrl: './app-modal.component.html',
    styleUrls: ['./app-modal.component.css']
})
export class AppModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  residentPersonalData: object;
  residentAddress: object;
  residentDocument: object;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
this.result = true;
this.close();
  }
}