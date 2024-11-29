import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { MessageModel } from 'src/app/core/models/message.model';
import { IsImagePipe } from "./is-image.pipe";

@Component({
  selector: 'riffle-message',
  standalone: true,
  imports: [CommonModule, IsImagePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  public name = input.required<string>();
  public image = input.required<string>();
  @Input() public message!: MessageModel;
  public time = input.required<string>();
}
