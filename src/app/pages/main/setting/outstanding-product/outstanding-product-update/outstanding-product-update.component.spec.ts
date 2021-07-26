import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingProductUpdateComponent } from './outstanding-product-update.component';

describe('OutstandingProductUpdateComponent', () => {
  let component: OutstandingProductUpdateComponent;
  let fixture: ComponentFixture<OutstandingProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingProductUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
