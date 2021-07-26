import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingEnterpriseCreateComponent } from './outstanding-enterprise-create.component';

describe('OutstandingEnterpriseCreateComponent', () => {
  let component: OutstandingEnterpriseCreateComponent;
  let fixture: ComponentFixture<OutstandingEnterpriseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingEnterpriseCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingEnterpriseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
