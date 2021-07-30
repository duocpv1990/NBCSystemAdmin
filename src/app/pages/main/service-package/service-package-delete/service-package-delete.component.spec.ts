import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePackageDeleteComponent } from './service-package-delete.component';

describe('ServicePackageDeleteComponent', () => {
  let component: ServicePackageDeleteComponent;
  let fixture: ComponentFixture<ServicePackageDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePackageDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePackageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
