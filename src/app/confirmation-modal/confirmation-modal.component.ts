import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  public title: string;
  public message: string;
  public callback: () => void;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; callback: () => void },
    public dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {
    this.message = data.message;
    this.title = data.title;
    this.callback = data.callback;
  }

  ngOnInit() {
    console.log(this.title);
    console.log(this.message);
  }

  close() {
    this.dialogRef.close();
  }

  executeCallback() {
    if (this.callback) {
      this.callback();
    }
    this.close();
  }
}
