import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-yoshiko-input',
  templateUrl: './yoshiko-input.component.html',
  styleUrls: ['./yoshiko-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YoshikoInputComponent),
      multi: true,
    },
  ],
})
export class YoshikoInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  label = '';
  @Input()
  id = '';
  @Input()
  name = '';
  @Input()
  placeholder = '';

  @ViewChild('input', { read: ElementRef, static: true })
  input: ElementRef;

  disabled = false;
  value: string;
  isFocused = false;

  onChange: (_: any) => any = (_: any) => {};
  onTouched: (_: any) => any = (_: any) => {};

  constructor(public changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  writeValue(value: string) {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  onInputChange(value) {
    this.value = value;
    this.onChange(value);
    this.changeDetectorRef.markForCheck();
  }

  onBlur() {
    this.isFocused = false;
  }

  onFocus() {
    this.isFocused = true;
  }

  registerOnChange(fn: () => any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
