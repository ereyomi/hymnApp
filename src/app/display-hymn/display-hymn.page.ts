import { Component, OnInit, Input } from '@angular/core';
import { HymysApiService } from '../services/hymys-api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-display-hymn',
  templateUrl: './display-hymn.page.html',
  styleUrls: ['./display-hymn.page.scss'],
})
export class DisplayHymnPage implements OnInit {
  // backHref = '/tabs/home';
  backHref: any;
  theHymn: any;
  hymnId: any;
  isFav: any;
  hymndata: any;
  itsAfav = false;
  // @Input() backHref: any;
  constructor(private hymnsApi: HymysApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.backHref = this.hymnsApi.backHref;

    this.route.data.subscribe(
      (data) => {
        const rawData = data.data;
        const hymnFullData = rawData[0];
        this.theHymn = hymnFullData.content;
        this.isFav = rawData[1];
        if (typeof this.isFav === 'undefined') {
          this.itsAfav = false;
          console.log('isFav: ', this.isFav, 'status: ', this.itsAfav);
        } else {
          this.itsAfav = true;
          console.log('isFav: ', this.isFav, 'status: ', this.itsAfav);
        }
        this.hymndata = {
          id: (typeof this.isFav !== 'undefined') ? this.isFav.id : 0,
          hymnId: hymnFullData.id,
          name: hymnFullData.name,
        };
      }
    );
  }
  check() {
    const data = {
      objectStoreName: 'hymnsfav',
      index: 'hymnId',
      indexData: 2,
    };
  }
  myData(data) {
    const hymnFullData = data[0];
    this.theHymn = hymnFullData.content;
    this.isFav = data[1];
    let itsAfav: boolean;
    if (this.isFav !== 'undefined') {
      itsAfav = true;
      console.log('isFav: ', this.isFav);
    } else {
      itsAfav = false;
      console.log('isFav: ', this.isFav);
    }
    this.hymndata = {
      id: hymnFullData.id,
      isFav: itsAfav
    };
  }

}
