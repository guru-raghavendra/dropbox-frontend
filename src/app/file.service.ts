import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://127.0.0.1:8000/api/'
  
  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name)
    return this.http.post(this.apiUrl + 'upload/', formData);
  }

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.apiUrl + 'files');
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(this.apiUrl + 'files/' + id + '/', { responseType: 'blob' });
  }
}
// http://127.0.0.1:8000/api/files/