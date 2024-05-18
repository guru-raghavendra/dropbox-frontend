import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit{
  filesList:any = []
  selectedFile: File | null = null;
  constructor(private fileService: FileService){}
  
  ngOnInit(): void {
    this.getFilesList()
  }

  getFilesList(){
    this.fileService.getFiles().subscribe({
      next: (response:any) => {
        this.filesList = response
      },
      error: (error:any) => {

      }
    })
  }

  onDownload(file: any): void {
    this.fileService.downloadFile(file.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(response => {
        console.log('File uploaded successfully', response);
        this.getFilesList()
      }, error => {
        console.error('Error uploading file', error);
      });
    }
  }



}
