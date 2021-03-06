import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, fromEvent, Subject, combineLatest } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, takeUntil, take } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ThemingService } from './services/theming.service';
import { PreferencesFacade } from './preferences/preferences.facade';

dayjs.extend(advancedFormat);

@Component({
  selector: 'app-presentimental',
  templateUrl: './presentimental.component.html',
  styleUrls: ['./presentimental.component.scss'],
})
export class PresentimentalComponent implements OnInit, AfterViewInit, OnDestroy {
  slidesUrl$: Observable<SafeResourceUrl>;
  webcamSize$: Observable<{ width: number; height: number }>;
  unsubscribe: Subject<void> = new Subject();

  showEditModal = false;
  webcamHeight = 0;
  showWebcamSwitch = false;
  conferenceLogoSrc: any = '/assets/netcentric_logo.svg';
  formGroup: FormGroup = this.fb.group({
    showLogo: [true],
    conferenceLogo: [null],
    conferenceTitle: [''],
    talkTitle: [''],
    speakerName: [''],
    slidesId: [''],
    mainColor: ['#331c93'],
    withGradient: [true],
    showDate: [true],
  });

  get showLogo(): boolean {
    return this.formGroup.controls.showLogo.value;
  }
  get conferenceTitle(): string {
    return this.formGroup.controls.conferenceTitle.value;
  }
  get talkTitle(): string {
    return this.formGroup.controls.talkTitle.value;
  }
  get speakerName(): string {
    return this.formGroup.controls.speakerName.value;
  }
  get slidesId(): string {
    return this.formGroup.controls.slidesId.value;
  }
  get mainColor(): string {
    return this.formGroup.controls.mainColor.value;
  }
  get today(): string {
    return dayjs().format('MMMM Do, YYYY');
  }
  get withGradient(): string {
    return this.formGroup.controls.withGradient.value;
  }
  get showDate(): string {
    return this.formGroup.controls.showDate.value;
  }

  @ViewChild('presenterArea', { static: false }) presenterArea: ElementRef;
  @ViewChild('presenterName', { static: false }) presenterName: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private host: ElementRef,
    private themingService: ThemingService,
    private preferencesFacade: PreferencesFacade,
  ) {
    this.formGroup.valueChanges.subscribe(value => {
      this.preferencesFacade.updatePreferences({
        ...value,
      });
    });
    this.formGroup.controls.conferenceLogo.valueChanges.subscribe(conferenceLogoSrc => {
      this.conferenceLogoSrc = conferenceLogoSrc;
    });
    combineLatest([
      this.formGroup.controls.mainColor.valueChanges.pipe(startWith(this.formGroup.controls.mainColor.value)),
      this.formGroup.controls.withGradient.valueChanges.pipe(startWith(this.formGroup.controls.withGradient.value)),
    ]).subscribe(([mainColor, withGradient]) => {
      this.themingService.setMainColor(this.host, mainColor, withGradient);
    });
    this.slidesUrl$ = this.formGroup.controls.slidesId.valueChanges.pipe(
      startWith(this.formGroup.controls.slidesId.value),
      map(id =>
        id
          ? this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000&embedded=true`,
            )
          : '',
      ),
    );
  }

  ngOnInit(): void {
    this.preferencesFacade.preferences$.subscribe(preferences => {
      this.formGroup.patchValue(preferences, { emitEvent: false });
    });

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
              this.presenterArea.nativeElement.offsetHeight - this.presenterName.nativeElement.offsetHeight,
              225,
            ),
          };
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
