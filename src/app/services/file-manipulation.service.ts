import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileManipulationService {
  removeURL = environment.apiUrl + '/remove';

  constructor(private http: HttpClient) {}

  deleteFile(fileId: String): Observable<void> {
    const url = `${this.removeURL}/${fileId}`;
    return this.http.get<void>(url);
  }
}
