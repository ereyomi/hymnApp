import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from '../core/helpers/subscription-helper';
import { HymysApiService } from '../services/hymys-api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit, OnDestroy {
  favHymns: any;
  favbackHref = '/tabs/favorite';
  displayText = 'My Favorite Hymns';
  route$: Subscription;
  constructor(
    private route: ActivatedRoute,
    private hymnsApi: HymysApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route$ = this.route.data.subscribe(
      (data) => {
        this.favHymns = data.data;
      }
    );
  }
  openDetails(event, id) {
    this.hymnsApi.backHref = this.favbackHref;
    console.log('hymn clicked: ', event.target.textContent);
    this.hymnsApi.toDisplayHymn = event.target.textContent;
    if (this.hymnsApi.toDisplayHymn !== null
      &&
      (this.hymnsApi.toDisplayHymn === event.target.textContent)) {
      this.router.navigateByUrl(`/hymn/${id}`);
    }
  }
  get favHymnsIsEmpty() {
    return this.favHymns.length <= 0 ? true : false;
  }
  ngOnDestroy() {
    unsubscriberHelper(this.route$);
  }

}
