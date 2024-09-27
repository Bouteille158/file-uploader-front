import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileTableComponent } from './file-table/file-table.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, FileTableComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
