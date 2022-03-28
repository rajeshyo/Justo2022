import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatalougePage } from './catalouge.page';

describe('CatalougePage', () => {
  let component: CatalougePage;
  let fixture: ComponentFixture<CatalougePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalougePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalougePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
