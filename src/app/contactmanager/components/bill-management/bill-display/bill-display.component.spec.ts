import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDisplayComponent } from './bill-display.component';

describe('BillDisplayComponent', () => {
  let component: BillDisplayComponent;
  let fixture: ComponentFixture<BillDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
