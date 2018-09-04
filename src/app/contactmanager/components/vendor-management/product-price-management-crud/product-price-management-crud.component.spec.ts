import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceManagementCrudComponent } from './product-price-management-crud.component';

describe('ProductPriceManagementCrudComponent', () => {
  let component: ProductPriceManagementCrudComponent;
  let fixture: ComponentFixture<ProductPriceManagementCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPriceManagementCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceManagementCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
