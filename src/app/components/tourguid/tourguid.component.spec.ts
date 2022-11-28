import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourguidComponent } from './tourguid.component';

describe('TourguidComponent', () => {
  let component: TourguidComponent;
  let fixture: ComponentFixture<TourguidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourguidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourguidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
