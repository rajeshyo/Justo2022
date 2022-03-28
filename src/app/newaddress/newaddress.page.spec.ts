import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewaddressPage } from './newaddress.page';

describe('NewaddressPage', () => {
  let component: NewaddressPage;
  let fixture: ComponentFixture<NewaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewaddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
