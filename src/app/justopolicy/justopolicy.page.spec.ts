import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JustopolicyPage } from './justopolicy.page';

describe('JustopolicyPage', () => {
  let component: JustopolicyPage;
  let fixture: ComponentFixture<JustopolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustopolicyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JustopolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
