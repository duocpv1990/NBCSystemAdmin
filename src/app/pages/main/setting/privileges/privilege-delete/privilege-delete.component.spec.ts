import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeDeleteComponent } from './privilege-delete.component';

describe('PrivilegeDeleteComponent', () => {
  let component: PrivilegeDeleteComponent;
  let fixture: ComponentFixture<PrivilegeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivilegeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
