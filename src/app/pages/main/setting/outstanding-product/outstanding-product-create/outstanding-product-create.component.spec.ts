import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingProductCreateComponent } from './outstanding-product-create.component';

describe('OutstandingProductCreateComponent', () => {
  let component: OutstandingProductCreateComponent;
  let fixture: ComponentFixture<OutstandingProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingProductCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
