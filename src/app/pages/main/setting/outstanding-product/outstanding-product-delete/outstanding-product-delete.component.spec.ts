import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingProductDeleteComponent } from './outstanding-product-delete.component';

describe('OutstandingProductDeleteComponent', () => {
  let component: OutstandingProductDeleteComponent;
  let fixture: ComponentFixture<OutstandingProductDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingProductDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingProductDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
