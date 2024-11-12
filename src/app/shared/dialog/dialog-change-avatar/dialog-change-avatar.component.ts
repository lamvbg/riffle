import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CloudinaryApi } from 'src/app/core/api/cloudinary.api';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: 'riffle-dialog-change-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-change-avatar.component.html',
  styleUrl: './dialog-change-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogChangeAvatarComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogChangeAvatarComponent>,
    private cdr: ChangeDetectorRef,
    private userStore: UserStore,
    private cloudinaryApi: CloudinaryApi,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImageUrl: string | null = null;
  isLoading: boolean = false;
  uploadProgress: number = 0;

  triggerFileInput(event: Event) {
    event.preventDefault();
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isLoading = true;
      const file = input.files[0];

      this.cloudinaryApi.uploadImage(file).subscribe({
        next: (response) => {
          this.uploadProgress = response.progress;
          if (response.url) {
            this.uploadedImageUrl = response.url;
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

  removeImage() {
    if (this.uploadedImageUrl) {
      this.cloudinaryApi.deleteImage(this.uploadedImageUrl).subscribe({
        next: () => {
          this.uploadedImageUrl = null;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Delete failed:', error);
        },
      });
    }
  }
}
