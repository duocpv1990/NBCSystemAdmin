import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePackageUpdateComponent } from './service-package-update.component';

describe('ServicePackageUpdateComponent', () => {
  let component: ServicePackageUpdateComponent;
  let fixture: ComponentFixture<ServicePackageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePackageUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePackageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
