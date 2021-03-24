import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppEnvironmentService } from '../core/services/app-environment.service';
import { BiblestudyService } from '../services/biblestudy.service';
import { IndexedDbService } from '../services/indexed-db.service';

@Component({
  selector: 'app-bible-study',
  templateUrl: './bible-study.page.html',
  styleUrls: ['./bible-study.page.scss'],
})
export class BibleStudyPage implements OnInit {
  bibleStudy: any;
  displayText = 'Bible Study';
  constructor(
    public loadingController: LoadingController,
    private appEnvS: AppEnvironmentService,
    private router: Router,
    private bibleS: BiblestudyService,
    public alertController: AlertController,
    private indexedDb: IndexedDbService,
  ) { }

  async ngOnInit() {
    try {
      const dataForSupaBase = {
        objectStoreName: 'bibleStudyOnline',
      };
      const getData: any[] = await this.indexedDb.getAll(dataForSupaBase);
      if (getData.length === 0) {
        await this.loadBibleStudy();
      } else {
        this.bibleStudy = getData[0].data;
        const msg = 'Pull to refresh';
      }

    } catch (error) {

    }
  }
  openBibleStudy(id: any) {
    this.router.navigateByUrl(`read-bible-study/${ id }`);
  }
  changedEditor(eve: any) { }
  async loadBibleStudy() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      backdropDismiss: false
    });
    await loading.present();

    try {
      const { data, error } = await this.bibleS.getBibleStudies();
      if (data) {
        const dataForSupaBase = {
          objectStoreName: 'bibleStudyOnline',
          id: 1,
          data,
        };
        await this.indexedDb.addDataWithId(dataForSupaBase);
      } else if (error) {
        this.presentAlertConfirm();
      } else {
        console.log('app error');
      }
      this.bibleStudy = data;
      loading.dismiss();
    } catch (error) {
      loading.dismiss();
    }
    /* const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!'); */
  }
  get isAdmin() {
    return this.appEnvS.isAdmin;
  }
  async doRefresh(event: any) {
    try {
      const { data } = await this.bibleS.getBibleStudies();
      this.bibleStudy = data;
      if (data) {
        const dataForSupaBase = {
          objectStoreName: 'bibleStudyOnline',
          id: 1,
          data,
        };
        await this.indexedDb.addDataWithId(dataForSupaBase);
      }
      event.target.complete();
    } catch (error) {
      event.target.complete();
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Unable to get Bible Study at this time. Please Pull to get data',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
}
