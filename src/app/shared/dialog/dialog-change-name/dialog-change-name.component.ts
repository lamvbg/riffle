import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'riffle-dialog-change-name',
  standalone: true,
  imports: [],
  templateUrl: './dialog-change-name.component.html',
  styleUrl: './dialog-change-name.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogChangeNameComponent {
  constructor(private dialogRef: MatDialogRef<DialogChangeNameComponent>,
    private cdr: ChangeDetectorRef
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }
}
