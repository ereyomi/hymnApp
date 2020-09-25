import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IndexedDbService } from './indexed-db.service';
import { Observable } from 'rxjs';
import { HymysApiService } from './hymys-api.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayHymnRouteResolver implements Resolve<any> {
  notes: any;

  constructor(private indexedDb: IndexedDbService, private hymnsApi: HymysApiService)  { }
  async resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any> | Promise<any> | any> {
    const id = +route.paramMap.get('id');
    const hymn = this.hymnsApi.getHymn(id);
    const checkifExistInFav = await this.checkFavHymn(id);
    return [hymn, checkifExistInFav];
  }
  async checkFavHymn(hymnId: any) {
    const data = {
      objectStoreName: 'favorite',
      index: 'hymnId',
      indexData: hymnId,
    };

    const hymn = await this.indexedDb.getByIndex(data);
    return hymn;
  }
}
