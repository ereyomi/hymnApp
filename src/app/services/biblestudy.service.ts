import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class BiblestudyService {
  supabase: any;
  SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjk3NjQ0MywiZXhwIjoxOTI4NTUyNDQzfQ.npPzB4XrvyKcOljn0Ug_byywg_OUscfFMBL3jHUoMUg';
  SUPERBASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjEyOTc2NDQzLCJleHAiOjE5Mjg1NTI0NDN9.km17M7KCTMcz41laQvp0tJIagnNDpFGgzqMufWlp19s';
  SUPABASE_URL = 'https://nqcfzgrghrcefzynlcxx.supabase.co';
  setBibleStudyId: any;

  constructor(private indexedDb: IndexedDbService,) { }
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
  sessionSuper() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('session: ', event, session);
    });
  }
  async seessionB() {
    const user = await this.supabase.auth.user();
    console.log(user);
    const session = this.supabase.auth.session();
    console.log(session);
    this.sessionSuper();
  }
  async getBibleStudies() {
    this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_KEY);
    // process.env.SUPABASE_KEY;
    // Create a single supabase client for interacting with your database 
    const { data, error } = await this.supabase
      .from('biblestudy')
      .select('*');
    return { data, error };/* '*' , 'id, topic'*/
  }
  setSuperBaseData(data: any) {
    const dataForSupaBase = {
      objectStoreName: 'bibleStudyOnline',
      id: 1,
      data,
    };
  }
  setToSaveBibleStudyData({ id = 0, data = {}, isSaved = false, created_at = new Date(),
    editted_at = new Date() }) {
    if (id !== 0) {
      this.setBibleStudyId = id;
    }
    const d = {
      objectStoreName: 'savedBibleStudy',
      id: this.setBibleStudyId,
      data,
      isSaved,
      created_at,
      editted_at,
    };
    return d;
  }
  saveFavBibleStudy(data: any) {
    const d = {
      id: data.id,
      data,
    };
    const saveFavBibleStudy = this.setToSaveBibleStudyData(d);
    console.log(saveFavBibleStudy);
    this.indexedDb.addDataWithId(saveFavBibleStudy);
  }
}
