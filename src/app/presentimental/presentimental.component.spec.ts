import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentimentalComponent } from './presentimental.component';

describe('PresentimentalComponent', () => {
  let component: PresentimentalComponent;
  let fixture: ComponentFixture<PresentimentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentimentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentimentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
