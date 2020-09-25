import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritePageResolver implements Resolve<any> {
    myfav: any;

  constructor(private indexedDb: IndexedDbService) { }
  resolve() {
    return this.getAllMyfav();
  }
  async getAllMyfav() {
    const data = {
      objectStoreName: 'favorite',
    };
    this.myfav = await this.indexedDb.getAllDataInDescOrder(data);
    return this.myfav;
  }
}
