import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, fromEvent, Subject } from 'rxjs';
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  delay,
  debounce,
  tap,
} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

dayjs.extend(advancedFormat);

@Component({
  selector: 'app-presentimental',
  templateUrl: './presentimental.component.html',
  styleUrls: ['./presentimental.component.scss'],
})
export class PresentimentalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  slidesUrl$: Observable<SafeResourceUrl>;
  webcamSize$: Observable<{ width: number; height: number }>;
  unsubscribe: Subject<void> = new Subject();

  showEditModal = false;
  webcamHeight = 0;
  showWebcamSwitch = false;
  formGroup: FormGroup = this.fb.group({
    talkTitle: [''],
    speakerName: [''],
    slidesId: [''],
  });

  get talkTitle(): string {
    return this.formGroup.controls.talkTitle.value;
  }
  get speakerName(): string {
    return this.formGroup.controls.speakerName.value;
  }
  get slidesId(): string {
    return this.formGroup.controls.slidesId.value;
  }
  get today(): string {
    return dayjs().format('MMMM Do, YYYY');
  }

  @ViewChild('presenterArea', { static: false }) presenterArea: ElementRef;
  @ViewChild('presenterName', { static: false }) presenterName: ElementRef;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.slidesUrl$ = this.formGroup.controls.slidesId.valueChanges.pipe(
      startWith(this.formGroup.controls.slidesId.value),
      map(id => {
        if (!id) {
          return '';
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000`,
        );
      }),
    );
  }

  ngOnInit(): void {
    if (!this.talkTitle && !this.speakerName && !this.slidesId) {
      this.showEditModal = true;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.webcamSize$ = fromEvent(window, 'resize').pipe(
        startWith({}),
        debounceTime(100),
        map(() => {
          return {
            width: Math.max(this.presenterArea.nativeElement.offsetWidth, 400),
            height: Math.max(
              this.presenterArea.nativeElement.offsetHeight -
                this.presenterName.nativeElement.offsetHeight,
              225,
            ),
          };
        }),
        tap(val => {
          console.log(val);
        }),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe),
      );
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onEditClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.showEditModal = true;
  }

  closeModal(withSave: boolean): void {
    this.showEditModal = false;
  }

  toggleWebcamSwitch(): void {
    this.showWebcamSwitch = !this.showWebcamSwitch;
  }
}
