import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  private _snackBar = inject(MatSnackBar);

  handleDownload(filename: string) {
    this._snackBar.open('Téléchargement du fichier ' + filename, 'Fermer', {
      duration: 5000,
    });
  }

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
