import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractApproveComponent } from './contract-approve.component';

describe('ContractApproveComponent', () => {
  let component: ContractApproveComponent;
  let fixture: ComponentFixture<ContractApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
