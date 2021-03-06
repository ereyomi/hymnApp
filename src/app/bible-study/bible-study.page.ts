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
  bibleStudys = [
    {
      id: 1,
      title: 'Heart of Man',
    },
    {
      id: 2,
      title: 'Curriculum of life'
    }
  ];

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
    const biblestudies = await this.bibleS.getBibleStudies();
    console.log(biblestudies);
  }
  segmentChanged(ev: any): void {
    this.segments = ev.detail.value;
  }
  openBibleStudy(event: Event, id: any) {
    console.log(id);
    this.router.navigateByUrl(`read-bible-study/${ id }`);
  }
  changedEditor(eve: any) {
    console.log('event', eve);
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
      backdropDismiss: false
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    // loading.dismiss(); // to dismiss
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
  doRefresh(event: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
