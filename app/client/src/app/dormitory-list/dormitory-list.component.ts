import {Component,ChangeDetectorRef} from '@angular/core';
import { Http, Response } from '@angular/http';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { Dormitory } from '../shared/dormitory';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dormitory-list',
  styleUrls: ['./dormitory-list.component.css'],
  templateUrl: './dormitory-list.component.html',
})
export class DormitoryListComponent {
  
  dormitoryData: DormitoryData | null; 
  dataSource: ExportDataTable | null;
  
  constructor(private changeDetector: ChangeDetectorRef, http: Http) {
    
    this.dormitoryData = new DormitoryData(http);
    this.dataSource = new ExportDataTable(this.dormitoryData);
  }
  ngOnInit() {  
    this.changeDetector.detectChanges();
  }
}

/** An example database that the data source uses to retrieve data for the table. */
export class DormitoryData {
  private dormitoryUrl = 'http://localhost:3000/dormitory';  

  getRepoIssues(): Observable<Dormitory[]> {
    return this.http.get(this.dormitoryUrl)
                    .map(this.extractData)
  }
  
  extractData(result: Response): Dormitory[] {
    return result.json().map(dormitory => {
      return {
        dormitoryName: dormitory.dormitoryName,
        adress: dormitory.adress
      }
    });
  }
  
  constructor(private http: Http) {}
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleHttpDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExportDataTable extends DataSource<Dormitory> {
  constructor(private _exampleDatabase: DormitoryData) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Dormitory[]> {
    return this._exampleDatabase.getRepoIssues();
  }

  disconnect() {}
}

