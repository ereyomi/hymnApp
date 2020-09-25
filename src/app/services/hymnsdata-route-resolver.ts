import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HymysApiService } from './hymys-api.service';

@Injectable({
  providedIn: 'root'
})
export class HymnsDataResolver implements Resolve<any> {

  constructor(private hymnsApi: HymysApiService) { }
  resolve() {
    return this.getAllHymns();
  }
  getAllHymns() {
    return this.hymnsApi.getAllHymns();
  }
}
