import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../services/indexed-db.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.css', './note.page.scss'],
})
export class NotePage implements OnInit {
  table = 'note'; // ObjectStore is same as table in mysql
  noteTitle = 'title';
  note = 'note';
  objectStoreName = 'note';

  notes: any;
  datt: any;
  check = false;
  constructor(
    private indexedDbS: IndexedDbService,
    private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    const datee = new Date(`20 January 2020`);
    this.datt = datee;

    // note data is gotten from the resolver service
    // this is to solve the issue of routing from the addnote that does not update the note page
    this.route.data.subscribe(
      (data) => this.notes = data.notes
    );
  }
  swipeme(ev) {
    console.log('swipe is working');
  }

  gotoAddPage() {
    this.router.navigateByUrl('crudnote');
  }
  viewNote(id: any) {
    this.router.navigateByUrl(`crudnote/${ id }`);
  }
  async deleteNote(d: any) {
    const data = {
      objectStoreName: this.objectStoreName,
      ...d
    };
    await this.indexedDbS.deleteData(data)
      .then(d => this.notes = d);
  }
}
