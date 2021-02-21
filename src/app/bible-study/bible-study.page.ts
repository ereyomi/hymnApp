import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';

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
    textVerse: [
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

  supabase: any;
  SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjk3NjQ0MywiZXhwIjoxOTI4NTUyNDQzfQ.npPzB4XrvyKcOljn0Ug_byywg_OUscfFMBL3jHUoMUg';
  SUPERBASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjEyOTc2NDQzLCJleHAiOjE5Mjg1NTI0NDN9.km17M7KCTMcz41laQvp0tJIagnNDpFGgzqMufWlp19s';
  SUPABASE_URL = "https://nqcfzgrghrcefzynlcxx.supabase.co";
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

  segments: string = 'upload';
  constructor(private fb: FormBuilder, public loadingController: LoadingController) { }

  async ngOnInit() {

    this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
    // process.env.SUPABASE_KEY;
    // Create a single supabase client for interacting with your database 
    let { data: biblestudy, error } = await this.supabase
      .from('biblestudy')
      .select('*');
    console.log(biblestudy, error);

    /* const user = await this.supabase.auth.user();
    console.log(user);
    const session = this.supabase.auth.session();
    console.log(session);
    this.sessionSuper(); */


    /* let { data: b, c } = await this.supabase
      .from('content')
      .select(`
      title,
    biblestudy (
      biblestudyId
    )
  `);
    console.log('biblestudy:', b, c); */

  }
  async signup() {
    const { user, session, error } = await this.supabase.auth.signUp({
      email: 'ereyomioluwaseyi@gmail.com',
      password: 'ere96yomi',
    });
    console.log(user, session, error);
  }
  async signin() {
    let { user, error } = await this.supabase.auth.signIn({
      email: 'ereyomioluwaseyi@gmail.com',
      password: 'ere96yomi',
    });
    console.log(user, error);
    this.sessionSuper();
  }
  async signout() {
    const { error } = this.supabase.auth.signOut();
    console.log(error);
    this.sessionSuper();
  }
  async resetpassword() {
    const { data, error } = this.supabase.auth.api.resetPasswordForEmail('ereyomioluwaseyi@gmail.com');
    /* const access_token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjEyOTg5MzY5LCJzdWIiOiJlNzgyMzkzZS0wOTY5LTQ3NjItOGMyOC1iNTNjM2JlNjhhYzciLCJlbWFpbCI6ImVyZXlvbWlvbHV3YXNleWlAZ21haWwuY29tIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwifSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.2wdcGFNAPSNuvQAD7RnDFO - 4pQGmDRFYoJWSdIQLcHo';
    const { error, data } = await this.supabase.auth.api
      .updateUser(access_token, { password: 'ereyomi' });*/
    console.log(data, error);

  }
  sessionSuper() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('session: ', event, session);
    });
  }
  segmentChanged(ev: any): void {
    console.log('event: ', ev.detail.value);
    this.segments = ev.detail.value;
  }
  openBibleStudy(event: Event, id: any) {
    console.log(id);
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
    this.presentLoading();
  }

}
