import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddServerService } from './services/add-server.service';
import { AddServerFormModel } from './models/add-server-form.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { UserStore } from 'src/app/core/stores/user.store';
import { CloudinaryApi } from 'src/app/core/api/cloudinary.api';

@Component({
  selector: 'riffle-dialog-add-server',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AddServerService],
  templateUrl: './dialog-add-server.component.html',
  styleUrl: './dialog-add-server.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddServerComponent {
  public constructor(
    private dialogRef: MatDialogRef<DialogAddServerComponent>,
    private cdr: ChangeDetectorRef,
    private addServerService: AddServerService,
    private userStore: UserStore,
    private cloudinaryApi: CloudinaryApi
  ) {}

  public readonly addServerForm = new FormGroup<AddServerFormModel>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

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
            this.addServerForm.controls.imageUrl.setValue(this.uploadedImageUrl);
            this.isLoading = false;
          }
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error("Upload failed:", error);
          this.isLoading = false;
          this.uploadProgress = 0;
        }
      });
    }
  }

  removeImage() {
    if (this.uploadedImageUrl) {
      this.cloudinaryApi.deleteImage(this.uploadedImageUrl).subscribe({
        next: () => {
          this.uploadedImageUrl = null;
          this.addServerForm.controls.imageUrl.reset();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error("Delete failed:", error);
        }
      });
    }
  }

  public addServer(): void {
    this.userStore.getUser
      .pipe(
        filter(Boolean),
        switchMap((user) => {
          return this.addServerService.addServer(
            this.addServerForm.controls.name.value,
            this.addServerForm.controls.imageUrl.value,
            user.profile.profileId,
          );
        }),
      )
      .subscribe({
        next: (value) => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
