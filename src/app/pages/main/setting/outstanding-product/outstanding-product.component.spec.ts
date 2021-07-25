import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingProductComponent } from './outstanding-product.component';

describe('OutstandingProductComponent', () => {
  let component: OutstandingProductComponent;
  let fixture: ComponentFixture<OutstandingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
