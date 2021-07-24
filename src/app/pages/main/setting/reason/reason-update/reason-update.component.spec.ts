import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonUpdateComponent } from './reason-update.component';

describe('ReasonUpdateComponent', () => {
  let component: ReasonUpdateComponent;
  let fixture: ComponentFixture<ReasonUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
