import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'riffle-dialog-verify',
  standalone: true,
  imports: [],
  templateUrl: './dialog-verify.component.html',
  styleUrl: './dialog-verify.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogVerifyComponent {
  constructor(private dialogRef: MatDialogRef<DialogVerifyComponent>,
    private cdr: ChangeDetectorRef
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }
}
