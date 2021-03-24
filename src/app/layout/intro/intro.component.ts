import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @Input() type!: string;
  @Input() displayText!: string;
  images = [
    {
      id: 1,
      name: 'on-string',
      type: 'default',
      extension: 'jpg'
    },
    {
      id: 2,
      name: 'study',
      type: 'bibleStudy',
      extension: 'png'
    },
    {
      id: 3,
      name: 'favorite',
      type: 'favorite',
      extension: 'jpg'
    }
  ];

  constructor() { }

  ngOnInit() {}
  getImgBYType() {
    const findByType = this.images.find(img => img.type === this.type);
    return this.pullAllTogetherWithExtention(findByType) || this.pullAllTogetherWithExtention(this.images[0]);
  }
  pullAllTogetherWithExtention(data: any) {
    return `${ data.name }.${ data.extension }`;
  }
  get displayImgType() {
    if (typeof this.type === 'undefined' || this.type === null || this.type === '') {
      return this.pullAllTogetherWithExtention(this.images[0]);
    } else {
      return this.getImgBYType();
    }
  }
  get displayImg() {
    return `assets/images/${ this.displayImgType }`;
  }
  get textToDisplay() {
    if (typeof this.displayText === 'undefined' || this.displayText === null || this.displayText === '') {
      return `The Redeemed Christian Fellowship
      <br />
      (AN ARM OF CHRIST THE REDEEMER'S MINISTRY)
      <br />
      FUPRE CHAPTER`;
    } else {
      return this.displayText;
    }
  }
}
