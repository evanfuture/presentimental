import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoshikoInputComponent } from './yoshiko-input.component';

describe('YoshikoInputComponent', () => {
  let component: YoshikoInputComponent;
  let fixture: ComponentFixture<YoshikoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoshikoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoshikoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
