import { FileManipulationService } from './../services/file-manipulation.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { callbackify } from 'util';

@Component({
  selector: 'app-file-table',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatTableModule,
    MatIcon,
    FileTableComponent,
    MatDialogModule,
  ],
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.scss',
})
export class FileTableComponent {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  data: fileInfo[] = [];
  displayedColumns = ['name', 'size', 'uploadDate', 'download', 'remove'];
  downloadURL = environment.apiUrl + '/download';
  removeURL = environment.apiUrl + '/remove';

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

  deletionConfirmationModal(id: String) {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Êtes vous sûr ?',
        message:
          "Voulez êtes sur le point de supprimer définitivement l'élément " +
          id,
        callback: () => {
          // this.fileManipulationService.deleteFile(id);
        },
      },
    });
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

// href="{{ removeURL }}/{{ data.id }}"
