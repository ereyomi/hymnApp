import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HymysApiService } from '../services/hymys-api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favHymns: any;
  favbackHref = '/tabs/favorite';
  displayText = 'My Favorite Hymns';
  constructor(
    private route: ActivatedRoute,
    private hymnsApi: HymysApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
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

}
