import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NavigationBarComponent} from '../../shared/components/navigation-bar/navigation-bar.component';
import { LeftPanelComponent } from "../../shared/components/left-panel/left-panel.component";
import { MessagePageComponent } from "../../shared/components/message-page/message-page.component";

@Component({
  selector: 'riffle-home',
  standalone: true,
  imports: [NavigationBarComponent, LeftPanelComponent, MessagePageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
