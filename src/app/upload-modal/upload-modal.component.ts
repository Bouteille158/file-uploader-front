import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.scss',
})
export class UploadModalComponent {
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UploadModalComponent>
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('New file selected : ');
      console.log(this.selectedFile);
    }
  }

  onSubmit(): any {
    console.log('Start submission');

    if (!this.selectedFile) {
      console.log('No file selected');
      return null;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('storageType', 'local');

    const headers = new HttpHeaders({});

    return this.http.post(environment.apiUrl + '/upload', formData, {
      headers,
    });
  }

  closeDialog() {
    const result = this.onSubmit();
    this.dialogRef.close(result);
  }
}
