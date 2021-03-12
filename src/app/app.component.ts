import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IndexedDbService } from './services/indexed-db.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private indexedDb: IndexedDbService
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.indexedDb.openIndexedDB();
    });

  }
}
