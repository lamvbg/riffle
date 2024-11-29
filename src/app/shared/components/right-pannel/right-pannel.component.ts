import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { filter, Subject, switchMap } from 'rxjs';
import { MemberApi } from 'src/app/core/api/member.api';
import { MemberModel } from 'src/app/core/models/member.model';
import { ServerStore } from 'src/app/core/stores/server.store';
import { UserStore } from 'src/app/core/stores/user.store';
import { MemberComponent } from "../member/member.component";

@Component({
  selector: 'riffle-right-pannel',
  standalone: true,
  imports: [CommonModule, MemberComponent],
  templateUrl: './right-pannel.component.html',
  styleUrl: './right-pannel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightPannelComponent {
  private triggerFetchData$ = new Subject<void>();
  public members: MemberModel[] = [];
  constructor(
    private memberApi: MemberApi,
    private userStore: UserStore,
    private serverStore: ServerStore,
    private cdf:ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.serverStore.getServer
      .pipe(
        filter(Boolean),
        switchMap((serverId) => {
          return this.memberApi.getMembers(serverId);
        })
      )
      .subscribe({
        next: (members) => {
          this.members = members as MemberModel[];
          this.cdf.detectChanges();
        },
      });
  }
}
