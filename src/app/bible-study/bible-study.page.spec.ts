import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BibleStudyPage } from './bible-study.page';

describe('BibleStudyPage', () => {
  let component: BibleStudyPage;
  let fixture: ComponentFixture<BibleStudyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleStudyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BibleStudyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
