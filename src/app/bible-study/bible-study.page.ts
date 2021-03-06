import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AppEnvironmentService } from '../core/services/app-environment.service';
import { BiblestudyService } from '../services/biblestudy.service';

@Component({
  selector: 'app-bible-study',
  templateUrl: './bible-study.page.html',
  styleUrls: ['./bible-study.page.scss'],
})
export class BibleStudyPage implements OnInit {
  componentForm = this.fb.group({
    topic: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
      ],
    ],
    textVerses: [
      '',
      [
        Validators.required,
      ],
    ],
    memoryVerse: [
      '',
      [
        Validators.required,
      ],
    ],
    introduction: [
      '',
      [
        Validators.required,
      ],
    ],
    outline: [
      '',
      [
        Validators.required,
      ],
    ],
    conclusion: [
      '',
      [
        Validators.required,
      ],
    ],
    upcomingEvent: [
      '',
      [
        Validators.required,
      ],
    ],
  });
  bibleStudySegments = {
    available: 'available',
    saved: 'saved',
    upload: 'upload'
  };
  bibleStudy: any;

  segments: string = this.bibleStudySegments.available;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    private appEnvS: AppEnvironmentService,
    private router: Router,
    private bibleS: BiblestudyService
  ) { }

  async ngOnInit() {
    this.segments = this.bibleStudySegments.available;
    await this.loadBibleStudy();
  }
  segmentChanged(ev: any): void {
    this.segments = ev.detail.value;
  }
  openBibleStudy(id: any) {
    this.router.navigateByUrl(`read-bible-study/${ id }`);
  }
  changedEditor(eve: any) {
    console.log('event', eve);
  }
  async loadBibleStudy() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      backdropDismiss: false
    });
    await loading.present();

    try {
      const { data, error } = await this.bibleS.getBibleStudies();
      this.bibleStudy = data;
      console.log(this.bibleStudy);
      loading.dismiss();
    } catch (error) {
      loading.dismiss();
    }
    /* const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!'); */
  }
  upload() {
    // this.presentLoading();
    this.insertToDb();
  }
  get isAdmin() {
    return this.appEnvS.isAdmin;
  }
  async insertToDb() {
    this.bibleS.insertToDb(this.componentForm.value);
  }
  async doRefresh(event: any) {
    console.log('Begin async operation');
    try {
      const { data } = await this.bibleS.getBibleStudies();
      this.bibleStudy = data;
      event.target.complete();
    } catch (error) {
      event.target.complete();
    }
  }
}
