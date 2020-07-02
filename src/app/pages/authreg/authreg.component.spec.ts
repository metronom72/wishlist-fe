import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthregComponent } from './authreg.component';

describe('AuthregComponent', () => {
  let component: AuthregComponent;
  let fixture: ComponentFixture<AuthregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
