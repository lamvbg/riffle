import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'riffle-dialog-change-mail',
  standalone: true,
  imports: [],
  templateUrl: './dialog-change-mail.component.html',
  styleUrl: './dialog-change-mail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogChangeMailComponent {
  constructor(private dialogRef: MatDialogRef<DialogChangeMailComponent>,
    private cdr: ChangeDetectorRef
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }
}
