import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonDeleteComponent } from './reason-delete.component';

describe('ReasonDeleteComponent', () => {
  let component: ReasonDeleteComponent;
  let fixture: ComponentFixture<ReasonDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
