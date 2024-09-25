import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { MatIcon } from '@angular/material/icon';
import { FileTableComponent } from './file-table/file-table.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    MatListModule,
    MatTableModule,
    MatIcon,
    FileTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  data: fileInfo[] = [];
  displayedColumns = ['name', 'size', 'uploadDate', 'download'];
  downloadURL = environment.apiUrl + '/download';

  getData() {
    this.http.get(environment.apiUrl + '/getAllFiles').subscribe((data) => {
      console.table(data);
      if (Array.isArray(data)) {
        this.data = data;
      }
    });
  }

  ngOnInit() {
    this.getData();
  }
}

export interface fileInfo {
  id: string;
  name: string;
  size: number;
  storageType: string;
  type: string;
  uploadDate: Date;
  url: string;
}
