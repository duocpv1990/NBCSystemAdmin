import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDeniComponent } from './contract-deni.component';

describe('ContractDeniComponent', () => {
  let component: ContractDeniComponent;
  let fixture: ComponentFixture<ContractDeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDeniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
