import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-aibun',
  templateUrl: './aibun.page.html',
  styleUrls: ['./aibun.page.scss'],
})
export class AibunPage implements OnInit, AfterContentInit {
  @ViewChild('typedTextSpan', { static: true }) typedTextSpan: ElementRef;
  @ViewChild('cursorSpan', { static: true }) cursorSpan: ElementRef;
  noteTextArray = [
    'looks like you are yet to add a note',
    `click on the "add" icon to add a note`,
  ];
  favTextArray = [
    'Hi',
    'You are yet to add a Hymn'
  ];
  bibleStudyTextArray = [
    'Pull to refresh',
    'I didnt find any Bible Study data'
  ];
  @Input() type!: string;
  typingDelay = 100;
  erasingDelay = 80;
  newTextDelay = 1000;
  textDataIndex = 0;
  charIndex = 0;
  setTimeOut: any;
  constructor() { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    if (this.textData.length > 0) {
      this.setTimeOut = setTimeout(this.typing, this.newTextDelay + 250);
    }
  }
  typing = () => {
    if (this.charIndex < this.textData[this.textDataIndex].length) {
      if (!this.cursorSpan.nativeElement.classList.contains('typing'))
        this.cursorSpan.nativeElement.classList.add('typing');

      this.typedTextSpan.nativeElement.textContent += this.textData[this.textDataIndex].charAt(this.charIndex);
      this.charIndex++;
      this.setTimeOut = setTimeout(this.typing, this.typingDelay);
    } else {
      this.cursorSpan.nativeElement.classList.remove('typing');
      this.setTimeOut = setTimeout(this.erase, this.newTextDelay);
    }
  };
  erase = () => {
    if (this.charIndex > 0) {
      if (!this.cursorSpan.nativeElement.classList.contains('typing'))
        this.cursorSpan.nativeElement.classList.add('typing');
      this.typedTextSpan.nativeElement.textContent = this.textData[this.textDataIndex].substring(
        0,
        this.charIndex - 1
      );
      this.charIndex--;
      this.setTimeOut = setTimeout(this.erase, this.erasingDelay);
    } else {
      this.cursorSpan.nativeElement.classList.remove('typing');
      this.textDataIndex++;
      if (this.textDataIndex >= this.textData.length) {
        this.textDataIndex = 0;
      };
      this.setTimeOut = setTimeout(this.typing, this.typingDelay + 1100);
    }
  };
  get textData(): Array<any> {
    if (this.type === 'favorite') {
      return this.favTextArray;
    } else if (this.type === 'note') {
      return this.noteTextArray;
    } else if (this.type === 'biblestudy') {
      return this.bibleStudyTextArray;
    } else {
      return [
        'empty'
      ];
    }
  }

}
