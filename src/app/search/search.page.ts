import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  theHymnsDb: any;
  searchResult: any;
  searchText: any;
  homeBackHref: any;
  searchbackHref = '/tabs/search';
  dom: any;
  allAvailablehymns: any;
  hymns: any;
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        this.allAvailablehymns = data.hymns;
        this.hymns = this.allAvailablehymns;
      }
    );
  }
  searchIt(event: any) {
    console.log(event);
    this.searchText = event.target.value.toLowerCase();
    this.hymns = this.allAvailablehymns.filter((v: { content: string; }) => {
      return v.content.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

}
