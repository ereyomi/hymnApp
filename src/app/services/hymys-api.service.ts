import { Injectable } from '@angular/core';
import { hymnsData } from 'src/app/hymnsDb/hymnsData';

@Injectable({
  providedIn: 'root'
})
export class HymysApiService {
  hymns = hymnsData;
  toDisplayHymn: any;
  backHref: any;
  constructor() { }
  getAllHymns() {
    return this.hymns;
  }
  getHymn(id) {
    return this.hymns.find(
      data => data.id === id
    );
  }
  getHymnByFilter(id) {
    return this.hymns.filter(
      data => data.id === id
    );
  }
}
