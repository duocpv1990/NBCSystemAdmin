import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingEnterpriseDeleteComponent } from './outstanding-enterprise-delete.component';

describe('OutstandingEnterpriseDeleteComponent', () => {
  let component: OutstandingEnterpriseDeleteComponent;
  let fixture: ComponentFixture<OutstandingEnterpriseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingEnterpriseDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingEnterpriseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
