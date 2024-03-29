import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IndexedDbService } from '../services/indexed-db.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from '../core/helpers/subscription-helper';

@Component({
  selector: 'app-crud-note',
  templateUrl: './crud-note.page.html',
  styleUrls: ['./crud-note.page.scss'],
})
export class CrudNotePage implements OnInit, OnDestroy {
  @ViewChild('mytextarea', { static: false }) mytextarea: ElementRef;

  title = '';
  note = '';
  edit: any;

  currentDate = new Date();
  toSendData: {};
  setNoteId = 0;

  screenSize = window.screen.height ||
    window.innerHeight || document.body.clientHeight
    || document.documentElement.clientHeight;

  route$: Subscription;
  constructor(
    private indexedDb: IndexedDbService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  setData({ id = 0, title = '',
    note = '', created_at = this.currentDate,
    editted_at = this.currentDate }) {
    if (id !== 0) {
      this.setNoteId = id;
    }
    const data = {
      objectStoreName: 'note',
      id: this.setNoteId,
      title,
      note,
      created_at,
      editted_at,
    };
    return data;
  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(
      async (params: Params) => {
        if (!isNaN(+params.id)) {
          const data = { id: +params.id };
          this.toSendData = this.setData(data);

          this.edit = await this.indexedDb.getData(this.toSendData);

          this.title = this.edit.title;
          this.note = this.edit.note;

        } else {
          console.log('+params.id is empty: a new note');
        }
      }
    );
  }
  textareaAutoIncrease(event) {
    const textarea = this.mytextarea.nativeElement;

    /* this is to get the position of the textarea bottom */
    const elWidth = textarea.getBoundingClientRect();

    if (this.screenSize > elWidth.bottom) {
      textarea.style.height = '';
      textarea.style.height = `${ Math.min(textarea.scrollHeight, this.screenSize) }px`;
    }
  }
  updateNote(event: any) {
    this.note = event.target.value;
  }
  async gobackAndSave() {
    await this.saveData();
    this.goBack();
  }
  goBack() {
    this.navCtrl.navigateBack('/tabs/note');
  }
  async saveData() {
    if (this.title === '' && this.note === '') {
      return false;
    } else {
      const data: {} = { title: this.title, note: this.note };
      this.toSendData = this.setData(data);
      if (this.setNoteId === 0) {
        await this.indexedDb.insert(this.toSendData);
      } else {
        await this.indexedDb.updateData(this.toSendData);
      }
    }

  }
  get wordLength() {
    return this.note.split(' ').length;
  }
  ngOnDestroy() {
    unsubscriberHelper(this.route$);
  }

}
