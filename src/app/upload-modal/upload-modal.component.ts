import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MaterialFileInputModule,
  FileValidator,
} from 'ngx-material-file-input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MaterialFileInputModule,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.scss',
})
export class UploadModalComponent {
  selectedFile: File | null = null;
  form: FormGroup;
  maxSize = 10737418241;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UploadModalComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      fileSelector: [
        null,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)],
      ],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length <= 0) {
      console.log('Sélection invalide');
      return;
    }

    this.selectedFile = input.files[0];
    console.log('New file selected : ');
    console.log(this.selectedFile);
  }

  sendFormData(): Observable<Object> | null {
    console.log('Start submission');

    if (!this.form.valid) {
      console.log('Form is not valid');
      return null;
    }

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

  submitDialog() {
    if (this.form.valid) {
      const result = this.sendFormData();
      this.dialogRef.close(result);
    } else {
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
