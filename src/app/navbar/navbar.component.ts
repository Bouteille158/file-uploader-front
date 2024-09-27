import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openUploadModal() {
    const dialogRef = this.dialog.open(UploadModalComponent);
    console.log(dialogRef);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.subscribe(
          (response: any) => {
            console.log('Upload successful', response);
            // Effectuez d'autres actions nécessaires après le succès de l'upload
            //TODO: refresh tableau si necessaire
          },
          (error: any) => {
            console.error('Upload failed', error);
          }
        );
      }
    });
  }

  ngOnInit() {}
}
