import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValutisFileInputComponent } from './valutis-file-input.component';

describe('ValutisFileInputComponent', () => {
  let component: ValutisFileInputComponent;
  let fixture: ComponentFixture<ValutisFileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValutisFileInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValutisFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
