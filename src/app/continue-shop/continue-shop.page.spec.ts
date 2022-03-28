import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContinueShopPage } from './continue-shop.page';

describe('ContinueShopPage', () => {
  let component: ContinueShopPage;
  let fixture: ComponentFixture<ContinueShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContinueShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
