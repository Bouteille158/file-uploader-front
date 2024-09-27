import { RouterModule, Routes } from '@angular/router';
import { FileTableComponent } from './file-table/file-table.component';
import { AboutComponent } from './about/about.component';
import { Component } from '@angular/core';

@Component({
  template: '',
})
class EmptyComponent {}

export const routes: Routes = [
  { path: '', component: EmptyComponent },
  { path: 'downloads', component: FileTableComponent },
  { path: 'about', component: AboutComponent },
];
