import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'riffle-emoji-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmojiPickerComponent {
  @Output() emojiSelected = new EventEmitter<string>();
  activeCategories: Set<string> = new Set();
  activeTab: string = 'emoji';

  @ViewChildren('categoryElement') categoryElements!: QueryList<ElementRef>;

  categories = [
    {type:'emoji', name: 'Mọi Người', icon:'👨‍👩‍👧‍👦', emojis: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🥴', '🤡'] },
    {type:'emoji', name: 'Thiên Nhiên', icon:'🌿', emojis: ['🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🌺', '🌻', '🌼', '🌷', '🌸', '🌹', '🌱', '🌰'] },
    {type:'emoji', name: 'Đồ Ăn', icon:'🍔', emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥭', '🥥', '🥝', '🍅', '🍆', '🥑'] },
    {type:'emoji', name: 'Hoạt Động', icon:'🏃', emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🥅', '🏒', '🏑', '🥍', '🏏', '⛳', '🏹', '🎣', '🥊'] },
    {type:'emoji', name: 'Du Lịch', icon:'✈️', emojis: ['✈️', '🛳️', '🚗', '🚂', '🚀', '🏕️', '🏖️', '🏜️', '⛰️', '🏛️', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎢', '🎡', '🎠', '🗿'] },
    {type:'emoji', name: 'Các Đối Tượng', icon:'👗', emojis: ['🎩', '👓', '👔', '👕', '👖', '👗', '👚', '👛', '👜', '👠', '👡', '👢', '👞', '👟', '🥾', '🧢', '⛑️', '🎒', '💼'] },
    {type:'emoji', name: 'Biểu Tượng', icon:'❤️', emojis: ['❤️', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️'] },
    {type:'sticker', name: 'Default', stickers: ['/images/stickers/cat.png', '/images/stickers/bear.png', '/images/stickers/fox.png', '/images/stickers/crocodile.png'] },
    {type:'sticker', name: 'Bo', stickers: ['/images/stickers/bo/bo-1.png', '/images/stickers/bo/bo-2.png', '/images/stickers/bo/bo-3.png', '/images/stickers/bo/bo-4.png', '/images/stickers/bo/bo-5.png', '/images/stickers/bo/bo-6.png', '/images/stickers/bo/bo-7.png', '/images/stickers/bo/bo-8.png', '/images/stickers/bo/bo-9.png', '/images/stickers/bo/bo-10.png', '/images/stickers/bo/bo-11.png', '/images/stickers/bo/bo-12.png', '/images/stickers/bo/bo-13.png', '/images/stickers/bo/bo-14.png', '/images/stickers/bo/bo-15.png'] },
    {type:'sticker', name: 'Pepe', stickers: ['/images/stickers/pepe/monkaS.png', '/images/stickers/pepe/pepe_cringe.gif', '/images/stickers/pepe/pepe_cross.png', '/images/stickers/pepe/pepe_high.png', '/images/stickers/pepe/Pepega.png', '/images/stickers/pepe/PepeHappy.png', '/images/stickers/pepe/pepeLove.png', '/images/stickers/pepe/pepewow.png'] },
    {type:'sticker', name: 'Blobcat', stickers: ['/images/stickers/blobcat/blobcat_knife.png', '/images/stickers/blobcat/BlobCatAngry.png','/images/stickers/blobcat/BlobCatHeart.png','/images/stickers/blobcat/BlobCatHotSip.gif','/images/stickers/blobcat/blobcathug.gif','/images/stickers/blobcat/blobcatmeataww.png','/images/stickers/blobcat/BlobCatMelt.png','/images/stickers/blobcat/BlobCatPat.png','/images/stickers/blobcat/blobcatpopcorn.png']}
  ];

  get filteredCategories() {
    return this.categories.filter(category => 
      (this.activeTab === 'emoji' && category.type === 'emoji') || 
      (this.activeTab === 'sticker' && category.type === 'sticker')
    );
  }

  ngOnInit() {
    const firstEmojiCategory = this.categories.find(category => category.type === 'emoji')?.name;
    const firstStickerCategory = this.categories.find(category => category.type === 'sticker')?.name;
    
    if (firstEmojiCategory) this.activeCategories.add(firstEmojiCategory);
    if (firstStickerCategory) this.activeCategories.add(firstStickerCategory);
  }

  toggleCategory(category: string) {
    if (this.activeCategories.has(category)) {
      this.activeCategories.delete(category);
    } else {
      this.activeCategories.add(category);
    }
  }

  selectEmoji(emoji: string) {
    this.emojiSelected.emit(emoji);
  }

  scrollToCategory(categoryName: string) {
    const categoryElement = this.categoryElements.find(element => element.nativeElement.textContent.includes(categoryName));
    if (categoryElement) {
      categoryElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeCategories.add(categoryName);
    }
  }
}