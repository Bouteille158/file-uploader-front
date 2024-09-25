import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-file-table',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatTableModule,
    MatIcon,
    FileTableComponent,
  ],
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.scss',
})
export class FileTableComponent {
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
