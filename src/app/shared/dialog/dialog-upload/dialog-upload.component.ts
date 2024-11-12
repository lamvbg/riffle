import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CloudinaryApi } from 'src/app/core/api/cloudinary.api';

@Component({
  selector: 'app-dialog-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  uploadedFile: { url: string; type: string; name: string } | null = null;
  isLoading: boolean = false;
  uploadProgress: number = 0;

  @Output() fileUploaded = new EventEmitter<{ url: string; type: string; name: string }>();


  public uploadForm = new FormGroup({
    fileUrl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fileType: new FormControl('', {
      nonNullable: true,
    }),
    fileName: new FormControl('', {
      nonNullable: true,
    }),
  });

  constructor(
    private dialogRef: MatDialogRef<DialogUploadComponent>,
    private cdr: ChangeDetectorRef,
    private cloudinaryApi: CloudinaryApi
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onUploadComplete(): void {
    if (this.uploadedFile) {
      this.fileUploaded.emit(this.uploadedFile);
    }
    this.onClose();
  }

  triggerFileInput(event: Event): void {
    event.preventDefault();
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isLoading = true;
      const file = input.files[0];
      const fileType = this.getFileType(file);
      const fileName = file.name;

      this.cloudinaryApi.uploadImage(file).subscribe({
        next: (response) => {
          this.uploadProgress = response.progress;
          if (response.url) {
            this.uploadedFile = { url: response.url, type: fileType, name: fileName };
            this.uploadForm.controls.fileUrl.setValue(response.url);
            this.uploadForm.controls.fileType.setValue(fileType);
            this.uploadForm.controls.fileName.setValue(fileName);
            this.isLoading = false;
          }
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.isLoading = false;
          this.uploadProgress = 0;
        },
      });
    }
  }

  private getFileType(file: File): string {
    if (file.type.startsWith('image')) return 'image';
    if (file.name.endsWith('.zip')) return 'zip';
    if (file.name.endsWith('.docx') || file.name.endsWith('.txt')) return 'docx';
    return 'unknown';
  }

  removeFile(): void {
    if (this.uploadedFile?.url) {
      this.isLoading = true;
      this.cloudinaryApi.deleteImage(this.uploadedFile.url).subscribe({
        next: () => {
          this.uploadedFile = null;
          this.uploadForm.reset();
          this.uploadProgress = 0;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Failed to remove file from Cloudinary:', error);
          this.isLoading = false;
        },
      });
    }
  }

  isImage(): boolean {
    return this.uploadedFile?.type === 'image';
  }

  isDocument(): boolean {
    return this.uploadedFile?.type === 'docx';
  }

  isZip(): boolean {
    return this.uploadedFile?.type === 'zip';
  }
}
