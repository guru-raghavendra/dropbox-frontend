import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit{

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

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
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (response:any) => {
          this.selectedFile = null;
          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';  // Clear the file input
          }
          this.getFilesList()
        },
        error: (err:any) => {
          
        }
      })
    }
  }


  getFileName(filePath: string): string {
    let fileName = filePath.split('/').pop() || filePath;
    if (fileName.length <= 30) {
      return fileName; // If the file name is short, just return it as is.
    }
    return fileName.slice(0,15) + '....' + fileName.slice(-15)
  }



}
