import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbResolver implements Resolve<any> {
  notes: any;

  constructor(private indexedDb: IndexedDbService) { }
  resolve() {
    return this.getAllSavedNotes();
  }
  async getAllSavedNotes() {
    const data = {
      objectStoreName: 'hymnsnote',
    };
    this.notes = await this.indexedDb.getAllDataInDescOrder(data);
    return this.notes;
  }
}
