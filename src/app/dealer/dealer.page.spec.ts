import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DealerPage } from './dealer.page';

describe('DealerPage', () => {
  let component: DealerPage;
  let fixture: ComponentFixture<DealerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DealerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
