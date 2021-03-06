import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-read-bible-study',
  templateUrl: './read-bible-study.page.html',
  styleUrls: ['./read-bible-study.page.scss'],
})
export class ReadBibleStudyPage implements OnInit {
  data = {
    topic: `THE IMPACT OF SPIRITUAL TRAINING`,
    text: `Heb. 5:12-14, 1 Timothy 4:7-16`,
    memoryVerse: `1 Tim 4:8 “For bodily exercise profiteth little: but godliness is profitable unto all things, having promise of the life that now is, and of that which is to come.”`,
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goback() {
    this.navCtrl.navigateBack('/tabs/biblestudy');
  }

}
