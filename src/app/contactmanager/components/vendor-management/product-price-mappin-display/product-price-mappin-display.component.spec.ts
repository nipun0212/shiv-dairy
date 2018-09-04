import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceMappinDisplayComponent } from './product-price-mappin-display.component';

describe('ProductPriceMappinDisplayComponent', () => {
  let component: ProductPriceMappinDisplayComponent;
  let fixture: ComponentFixture<ProductPriceMappinDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPriceMappinDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceMappinDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
