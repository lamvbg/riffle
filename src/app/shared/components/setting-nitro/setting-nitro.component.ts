import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NitroSectionModel } from './models/nitro-section.model';
import { SettingNitroSectionComponent } from "../setting-nitro-section/setting-nitro-section.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-setting-nitro',
  standalone: true,
  imports: [SettingNitroSectionComponent, RouterLink],
  templateUrl: './setting-nitro.component.html',
  styleUrl: './setting-nitro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingNitroComponent {
  public sections: NitroSectionModel[] = [
    {
      title: 'Nhiều Emoji Hơn',
      image: 'images/nitro-images/nitro1.png',
      description: 'Cấu trúc đặc quyên, giễu cơt và tạo meme bằng emoji tùy chỉnh ứng mọi nơi.'
    },
    {
      title: 'Video HD',
      image: 'images/nitro-images/nitro2.png',
      description: 'Stream có độ phân giải video tốt hơn. Stream ứng dụng và game mặt mà, ứng dụng máy tính.'
    },
    {
      title: 'Tải lên 500MB',
      image: 'images/nitro-images/nitro3.png',
      description: 'Tải lên bất cứ thứ gì là 500MB. (Beta)'
    },
    {
      title: 'Biểu Cảm Siêu Cấp Không Giới Hạn',
      image: 'images/nitro-images/nitro4.png',
      description: 'Biểu Cảm Siêu Cấp không giới hạn, để bạn có thể giải phóng sự hỗn loạn trong các nhóm trò chuyện.'
    },
    {
      title: 'Truy Cập Sticker Đặc Biệt',
      image: 'images/nitro-images/nitro5.png',
      description: 'Sử dụng sticker tùy chỉnh ở mọi nơi và truy cập hơn 300 sticker độc quyền của Nitro.'
    },
    {
      title: 'Huy hiệu người đăng ký',
      image: 'images/nitro-images/nitro6.png',
      description: 'Nhận huy hiệu cực ngầu này khi trở thành người đăng ký Nitro.'
    }
  ]

}
