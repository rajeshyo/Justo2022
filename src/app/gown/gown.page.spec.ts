import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GownPage } from './gown.page';

describe('GownPage', () => {
  let component: GownPage;
  let fixture: ComponentFixture<GownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GownPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
