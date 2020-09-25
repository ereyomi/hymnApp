import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplayHymnPage } from './display-hymn.page';

describe('DisplayHymnPage', () => {
  let component: DisplayHymnPage;
  let fixture: ComponentFixture<DisplayHymnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayHymnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayHymnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
