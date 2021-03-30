import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { AppEnvironmentService } from '../core/services/app-environment.service';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class BiblestudyService {
  supabase: any;
  SUPABASE_KEY = this.appEnvS.supaBaseKey;
  SUPERBASE_SERVICE_KEY = this.appEnvS.supaBaseServiceKey;
  SUPABASE_URL = this.appEnvS.subaBaseUrl;
  setBibleStudyId: any;

  constructor(private indexedDb: IndexedDbService, private appEnvS: AppEnvironmentService) { }
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
