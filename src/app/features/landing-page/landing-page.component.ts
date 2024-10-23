import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionComponent } from './components/section/section.component';
import { SectionModel } from './models/section.model';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-landing-page',
  standalone: true,
  imports: [SectionComponent, NgClass, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  public sections: SectionModel[] = [
    {
      title: 'Make your group chats more fun',
      description:
        'Use custom emoji, stickers, soundboard effects and more to add your personality to your voice, video, or text chat. Set your avatar and a custom status, and write your own profile to show up in chat your way.',
      layout: 'flex',
      video: '/videos/video1.mp4',
      translateX: 'translate-x-8',
    },
    {
      title: 'stream like you’re in the same room',
      description:
        "High quality and low latency streaming makes it feel like you're hanging out on the couch with friends while playing a game, watching shows, looking at photos, or idk doing homework or something.",
      layout: 'flex-row-reverse',
      video: '/videos/video2.mp4',
      translateX: '',
    },
    {
      title: "Hop in when you're free, no need to call",
      description:
        'Easily hop in and out of voice or text chats without having to call or invite anyone, so your party chat lasts before, during, and after your game session.',
      layout: 'flex',
      video: '/videos/video3.mp4',
      translateX: '-translate-x-8',
    },
    {
      title: "See who's around to chill",
      description:
        "See who's around, playing games, or just hanging out. For supported games, you can see what modes or characters your friends are playing and directly join up.",
      layout: 'flex-row-reverse',
      video: '/videos/video4.mp4',
      translateX: 'translate-x-8',
    },
    {
      title: 'always have something to do together',
      description:
        'Watch videos, play built-in games, listen to music, or just scroll together and spam memes. Seamlessly text, call, video chat, and play games, all in one group chat.',
      layout: 'flex',
      video: '/videos/video5.mp4',
      translateX: '',
    },
    {
      title: 'wherever YOU GAME, HANG OUT HERE',
      description:
        'On your PC, phone, or console, you can still hang out on Discord. Easily switch between devices and use tools to manage multiple group chats with friends.',
      layout: 'flex-row-reverse',
      video: '/videos/video6.mp4',
      translateX: '-translate-x-8',
    },
  ];
}
