import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterViewInit {
  theHymnsDb: any;
  searchResult: any;
  searchText: any;
  homeBackHref: any;
  searchbackHref = '/tabs/search';
  dom: any;
  @ViewChild('hymnlist', { static: false }) hymnlist: ElementRef;
  allAvailablehymns: any;
  constructor(private el: ElementRef, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => this.allAvailablehymns = data.hymns
    );
  }
  ngAfterViewInit() {
    this.dom = this.el.nativeElement;
  }
  searchIt(event) {
    this.searchText = event.target.value.toLowerCase();
    const li: any = document.querySelectorAll('.searchBox ol li');
    li.forEach(hymnli => {
      const getli = hymnli.textContent;
      if (getli.toLowerCase().indexOf(this.searchText) !== -1) {
        hymnli.style.display = 'block';
      } else {
        hymnli.style.display = 'none';
      }
    });
  }

}
