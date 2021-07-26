import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingEnterpriseUpdateComponent } from './outstanding-enterprise-update.component';

describe('OutstandingEnterpriseUpdateComponent', () => {
  let component: OutstandingEnterpriseUpdateComponent;
  let fixture: ComponentFixture<OutstandingEnterpriseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingEnterpriseUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingEnterpriseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
