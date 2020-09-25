import { Component, OnInit } from '@angular/core';
import { HymysApiService } from '../services/hymys-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  myhymns: any;
  allAvailablehymns: any;
  homebackHref = '/tabs/home';
  constructor(private hymnsApi: HymysApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe(
      (data) => this.allAvailablehymns = data.hymns
    );
  }

}
