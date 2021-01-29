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
  getHymn(id: any) {
    return this.hymns.find(
      data => data.id === id
    );
  }
  getHymnByFilter(id: any) {
    return this.hymns.filter(
      data => data.id === id
    );
  }
}
