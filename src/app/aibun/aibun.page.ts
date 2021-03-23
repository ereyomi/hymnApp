import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
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
  textData = [
    'Hi I am Aibun',
    'looks like you are yet to add a note',
    `click on the "add" icon to add a note`,
  ];
  textDataB = [
    'search made easy',
    'type in something let me find it'
  ];
  @Input() set type(data: string) {
    typeof data === 'undefined' ? '' : '';
  };
  typingDelay = 100;
  erasingDelay = 80;
  newTextDelay = 1000;
  textDataIndex = 0;
  charIndex = 0;
  constructor() { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    if (this.textData.length > 0) {
      setTimeout(this.typing, this.newTextDelay + 250);
    }
  }
  typing = () => {
    if (this.charIndex < this.textData[this.textDataIndex].length) {
      if (!this.cursorSpan.nativeElement.classList.contains('typing'))
        this.cursorSpan.nativeElement.classList.add('typing');

      this.typedTextSpan.nativeElement.textContent += this.textData[this.textDataIndex].charAt(this.charIndex);
      this.charIndex++;
      setTimeout(this.typing, this.typingDelay);
    } else {
      this.cursorSpan.nativeElement.classList.remove('typing');
      setTimeout(this.erase, this.newTextDelay);
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
      setTimeout(this.erase, this.erasingDelay);
    } else {
      this.cursorSpan.nativeElement.classList.remove('typing');
      this.textDataIndex++;
      if (this.textDataIndex >= this.textData.length) this.textDataIndex = 0;
      setTimeout(this.typing, this.typingDelay + 1100);
    }
  };

}
