import { ChangeDetectionStrategy, ChangeDetectorRef, Component, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../../dialog/dialog-add-channel/dialog-add-channel.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'riffle-channel',
  standalone: true,
  imports: [],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelComponent {
  private triggerFetchData$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    private cdf: ChangeDetectorRef,
    
  ) {}
  public name = input.required<string>();
  public type = input.required<string>();

  public openDialog(): void {
    this.dialog
      .open(DialogAddChannelComponent)
      .afterClosed()
      .subscribe(() => {
        this.triggerFetchData$.next();
      })
  }
}
