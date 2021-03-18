import {
  AfterContentInit,
  Component,
  ElementRef,
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
  textArray = [
    'Hi I am Aibun',
    'this page is Empty',
    `click on the "add" icon to add a note`,
  ];
  typingDelay = 100;
  erasingDelay = 80;
  newTextDelay = 1000;
  textArrayIndex = 0;
  charIndex = 0;
  constructor() { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    if (this.textArray.length > 0) {
      setTimeout(this.type, this.newTextDelay + 250);
    }
  }
  type = () => {
    if (this.charIndex < this.textArray[this.textArrayIndex].length) {
      if (!this.cursorSpan.nativeElement.classList.contains('typing'))
        this.cursorSpan.nativeElement.classList.add('typing');

      this.typedTextSpan.nativeElement.textContent += this.textArray[this.textArrayIndex].charAt(this.charIndex);
      this.charIndex++;
      setTimeout(this.type, this.typingDelay);
    } else {
      this.cursorSpan.nativeElement.classList.remove('typing');
      setTimeout(this.erase, this.newTextDelay);
    }
  };
  erase = () => {
    if (this.charIndex > 0) {
      if (!this.cursorSpan.nativeElement.classList.contains('typing'))
        this.cursorSpan.nativeElement.classList.add('typing');
      this.typedTextSpan.nativeElement.textContent = this.textArray[this.textArrayIndex].substring(
        0,
        this.charIndex - 1
      );
      this.charIndex--;
      setTimeout(this.erase, this.erasingDelay);
    } else {
      this.cursorSpan.nativeElement.classList.remove('typing');
      this.textArrayIndex++;
      if (this.textArrayIndex >= this.textArray.length) this.textArrayIndex = 0;
      setTimeout(this.type, this.typingDelay + 1100);
    }
  };

}
