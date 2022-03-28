import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShirtdetailPage } from './shirtdetail.page';

describe('ShirtdetailPage', () => {
  let component: ShirtdetailPage;
  let fixture: ComponentFixture<ShirtdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShirtdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShirtdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
