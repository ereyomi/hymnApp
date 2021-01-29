import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toPage: string;
  isBack: boolean;
  favStatus: boolean;
  favId: any;

  @Input() hymnData: any;

  @Input() set back(data: boolean) {
    (data) ? (this.isBack = data) : (this.isBack = false);
  }
  @Input() set backHref(val: any) {
    (val) ? (this.toPage = val) : (this.toPage = '/tabs/home');
  }
  @Input() set theFavStatus(val: any) {
    (val) ? (this.favStatus = val) : (this.favStatus = false);
  }

  constructor(private indexedDb: IndexedDbService, private router: Router, private navCtrl: NavController) {
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateBack(`${this.toPage}`);
  }
  addOrRemoveFav() {
    this.setData();
    this.saveFav();
  }
  async saveFav() {
    const toSendData = this.setData();
    console.log('processing save: ', toSendData);

    if (this.favStatus === false && (toSendData.id === 0 || typeof toSendData.id === 'undefined')) {
      const saveit = await this.indexedDb.insert(toSendData);
      console.log('i think i will insert now', saveit);
      if (saveit) {
        this.setData(saveit);
      }
    } else {
      if (toSendData.id !== 0) {
        const checkforData = await this.indexedDb.getData(toSendData);
        if (this.favStatus === true && typeof checkforData !== 'undefined') {
          console.log('i think i will remove now');
          const del = await this.indexedDb.deleteData(toSendData);
          if (typeof del === 'undefined') {
            this.hymnData.id = 0;
            console.log('remove now complete');
          }
        }
      }
    }
    this.favStatus = !this.favStatus;
  }
  setData({id = 0} = {}) {
    if (id !== 0)  {
      this.hymnData.id = id;
    }
    const data = {
      objectStoreName: 'favorite',
      id: this.hymnData.id,
      hymnId: this.hymnData.hymnId,
      hymn: `${this.hymnData.name}`,
    };
    return data;
  }

}
