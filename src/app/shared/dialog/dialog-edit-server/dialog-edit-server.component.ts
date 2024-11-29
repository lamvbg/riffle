import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditServerService } from './service/edit-server.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { ServerStore } from 'src/app/core/stores/server.store';
import { CloudinaryApi } from 'src/app/core/api/cloudinary.api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddServerFormModel } from '../dialog-add-server/models/add-server-form.model';
import { filter, switchMap } from 'rxjs';
import { ServerApi } from 'src/app/core/api/server.api';
import { ServerModel } from 'src/app/core/models/server.model';
import { MemberModel } from 'src/app/core/models/member.model';

@Component({
  selector: 'riffle-dialog-edit-server',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [EditServerService],
  templateUrl: './dialog-edit-server.component.html',
  styleUrl: './dialog-edit-server.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEditServerComponent {
  public server: ServerModel | null = null;
  public members: MemberModel[] = [];
  public serverName: string = '';
  public imageUrl: string = '';
  public constructor(
    private dialogRef: MatDialogRef<DialogEditServerComponent>,
    private cdr: ChangeDetectorRef,
    private editServerService: EditServerService,
    private userStore: UserStore,
    private severStore: ServerStore,
    private cloudinaryApi: CloudinaryApi,
    private serverApi: ServerApi,
    // store data co san cua dialog truyen vao la nhan duoc
    @Inject(MAT_DIALOG_DATA) public data: { server: ServerModel; members: MemberModel[] }
  ) {
    this.server = data.server;
    this.members = data.members;
    this.serverName = data.server.name;
    this.imageUrl = data.server.imageUrl;
  }

  public readonly editServerForm = new FormGroup<AddServerFormModel>({
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
            this.editServerForm.controls.imageUrl.setValue(this.uploadedImageUrl);
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
          this.editServerForm.controls.imageUrl.reset();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error("Delete failed:", error);
        }
      });
    }
  }

  public editServer(): void {
    const finalImageUrl = this.uploadedImageUrl || this.imageUrl;
    this.severStore.getServer
      .pipe(
        filter(Boolean),
        switchMap((serverId) => {
          return this.editServerService.editServer(
            this.editServerForm.controls.name.value,
            finalImageUrl,
            serverId, 
          );
        }),
      )
      .subscribe({
        next: (server) => {
          this.server = server;
          console.log(this.server)
          this.dialogRef.close(server);
        },
      });
  }

  activeTab: string = 'overview';

  selectTab(tab: string) {
    this.activeTab = tab;
  }

}
