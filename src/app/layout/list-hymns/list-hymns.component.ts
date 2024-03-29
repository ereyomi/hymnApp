import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HymysApiService } from 'src/app/services/hymys-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-hymns',
  templateUrl: './list-hymns.component.html',
  styleUrls: ['./list-hymns.component.scss'],
})
export class ListHymnsComponent implements OnInit {
  @Input() backHref: any;
  @Input() set hymnsData(data: any) {
    (typeof data === 'undefined') ? (this.hymns = null) : (this.hymns = data);
  }
  @Output() emitid = new EventEmitter(null);
  objectKeys = Object.keys;
  hymns: any;
  constructor(private hymnsApi: HymysApiService, private router: Router) { }

  ngOnInit() {
    this.hymns = this.hymnsApi.getAllHymns();
  }
  /* am not using query parameters as it not a good practice
  I would be storing the data into HymnsApi variable and would call it the other end
  Note: the design database is very wrong
  */
  openDetails(event: any, id: any) {
    this.hymnsApi.backHref = this.backHref;
    console.log('hymn clicked: ', event.target.textContent);
    this.hymnsApi.toDisplayHymn = event.target.textContent;
    if (this.hymnsApi.toDisplayHymn !== null) {
      this.router.navigateByUrl(`/hymn/${ id }`);
    }
  }

}
