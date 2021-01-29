import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IndexedDbService } from '../services/indexed-db.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-crud-note',
  templateUrl: './crud-note.page.html',
  styleUrls: ['./crud-note.page.scss'],
})
export class CrudNotePage implements OnInit {
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


  constructor(private indexedDb: IndexedDbService,
    private navCtrl: NavController,
    private route: ActivatedRoute) { }

  setData({ id = 0, title = '',
    note = '', created_at = this.currentDate,
    editted_at = this.currentDate }) {
    if (id !== 0) {
      this.setNoteId = id;
    }
    const data = {
      objectStoreName: 'hymnsnote',
      id: this.setNoteId,
      title,
      note,
      created_at,
      editted_at,
    };
    return data;
  }

  ngOnInit() {
    this.route.params.subscribe(
      async (params: Params) => {
        if (!isNaN(+params.id)) {
          console.log(+params.id);
          const data = { id: +params.id };
          this.toSendData = this.setData(data);
          console.log('this is what I set: ', this.toSendData);

          this.edit = await this.indexedDb.getData(this.toSendData);
          console.log(this.edit);

          this.title = this.edit.title;
          this.note = this.edit.note;

        } else {
          console.log('+params.id is empty');
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
    console.log(this.title, this.note);
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
      console.log(data);
      this.toSendData = this.setData(data);
      console.log('am sending this: ', this.toSendData);
      if (this.setNoteId === 0) {
        console.log('inserting...');
        await this.indexedDb.insert(this.toSendData);
      } else {
        console.log('updatin...');
        await this.indexedDb.updateData(this.toSendData);
      }
    }

  }

}
