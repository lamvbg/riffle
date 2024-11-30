import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ServerApi } from 'src/app/core/api/server.api';
import { ServerModel } from 'src/app/core/models/server.model';

@Component({
  selector: 'riffle-admin-server-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-server-page.component.html',
  styleUrl: './admin-server-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminServerPageComponent {
  public server: ServerModel[] = [];

  constructor(
    private serverApi: ServerApi,
    private cdf: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.serverApi.getServers().subscribe({
      next: (server) => {
        this.server = server;
        this.cdf.detectChanges();
      },
    })
  }

  editServer(server: any): void {
    console.log('Edit server:', server);
    alert(`Editing server: ${server.name}`);
  }
  removerServer(server: any): void {
    const confirmDelete = confirm(`Are you sure you want to remove ${server.name}?`);
    if (confirmDelete) {
      this.server = this.server.filter(u => u.id !== server.id);
      console.log('Server removed:', server);
    }
  }
}
