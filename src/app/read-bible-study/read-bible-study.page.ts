import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BiblestudyService } from '../services/biblestudy.service';

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
  bibleStudy: any;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private bibleS: BiblestudyService
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(
      async (params: Params) => {
        if (params.id) {
          const id = params.id;
          console.log(id);
          try {
            
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('+params.id is empty');
        }
      }
    );
  }
  goback() {
    this.navCtrl.navigateBack('/tabs/biblestudy');
  }

}
