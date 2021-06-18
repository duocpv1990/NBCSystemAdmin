import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeUpdateComponent } from './privilege-update.component';

describe('PrivilegeUpdateComponent', () => {
  let component: PrivilegeUpdateComponent;
  let fixture: ComponentFixture<PrivilegeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivilegeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
