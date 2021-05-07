import { Component, OnDestroy, OnInit } from '@angular/core';
import { HymysApiService } from '../services/hymys-api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from '../core/helpers/subscription-helper';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  myhymns: any;
  allAvailablehymns: any;
  homebackHref = '/tabs/home';
  route$: Subscription;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route$ = this.route.data.subscribe(
      (data) => this.allAvailablehymns = data.hymns
    );
  }
  ngOnDestroy() {
    unsubscriberHelper(this.route$);
  }

}
