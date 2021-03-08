import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IndexedDbService } from './indexed-db.service';
import { Observable } from 'rxjs';
import { HymysApiService } from './hymys-api.service';

@Injectable({
  providedIn: 'root'
})
export class ReadHymnsRouteResolver implements Resolve<any> {
  notes: any;

  constructor(private indexedDb: IndexedDbService) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any> | Promise<any> | any> {
    const id = route.paramMap.get('id');
    const getbibleStudy = await this.checkBibleStudy(id);
    return getbibleStudy;
  }
  async checkBibleStudy(bibelStudyId: any) {
    const dataForSupaBase = {
      objectStoreName: 'bibleStudyOnline',
    };
    const getBiblestudy: any[] = await this.indexedDb.getAll(dataForSupaBase);
    if (getBiblestudy.length === 0) {
      return null;
    } else {
      const bbb = getBiblestudy[0].data;
      const h = bbb.find(b => b.id === bibelStudyId);
      if (h !== undefined) {
        return h;
      }
    }
  }
}
