import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingEnterpriseComponent } from './outstanding-enterprise.component';

describe('OutstandingEnterpriseComponent', () => {
  let component: OutstandingEnterpriseComponent;
  let fixture: ComponentFixture<OutstandingEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
