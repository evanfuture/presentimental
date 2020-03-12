import {
  Component,
  HostListener,
  ElementRef,
  forwardRef,
  Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-valutis-file-input',
  templateUrl: './valutis-file-input.component.html',
  styleUrls: ['./valutis-file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValutisFileInputComponent),
      multi: true
    }
  ]
})
export class ValutisFileInputComponent implements ControlValueAccessor {
  @Input()
  id = '';
  @Input()
  name = '';
  @Input()
  placeholder = '';

  onChange: (prop: any) => any;
  fileName = '';

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private sanitizer: DomSanitizer
  ) {}

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const src = this.sanitizer.bypassSecurityTrustResourceUrl(
        e.target.result
      );
      this.onChange(src);
      this.fileName = file.name;
    };

    reader.readAsDataURL(file);
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.fileName = '';
  }

  registerOnChange(fn: () => any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any) {}
}
