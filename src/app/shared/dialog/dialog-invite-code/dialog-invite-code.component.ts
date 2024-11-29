import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { ServerModel } from 'src/app/core/models/server.model';
import { ServerStore } from 'src/app/core/stores/server.store';
import { ChangeInviteCodeService } from './services/change-invite-code.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'riffle-dialog-invite-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ChangeInviteCodeService],
  templateUrl: './dialog-invite-code.component.html',
  styleUrl: './dialog-invite-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogInviteCodeComponent {
  public dataServer: ServerModel | null = null;
  public inviteCode: string = '';
  public name: string = '';
  public constructor(
    private dialogRef: MatDialogRef<DialogInviteCodeComponent>,
    private cdf: ChangeDetectorRef,
    private serverStore: ServerStore,
    private changeInviteCodeService: ChangeInviteCodeService,

    @Inject(MAT_DIALOG_DATA) public data: ServerModel,
  ) {
    this.dataServer = data;
    this.name = data.name;
    this.inviteCode = data.inviteCode;
  }
  onClose(): void {
    this.dialogRef.close();
  }

  public changeInviteCode(): void {
    this.serverStore.getServer
      .pipe(
        filter(Boolean),
        switchMap((serverId) =>
          this.changeInviteCodeService.changeInviteCode(serverId),
        ),
      )
      .subscribe({
        next: (update) => {
          this.inviteCode = update.inviteCode;
          this.cdf.detectChanges();
        },
        error: (error) => {
          console.error('Failed to change invite code:', error);
        },
      });
  }

  public copyInviteCode(): void {
    navigator.clipboard.writeText(this.inviteCode).then(() => {
    });
  }
  
}
