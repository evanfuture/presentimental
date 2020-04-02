import { Injectable, ElementRef } from '@angular/core';
import chroma from 'chroma-js';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  constructor() {}
  setMainColor(hostElement: ElementRef, color: string, withGradient: boolean) {
    const secondaryColor = withGradient
      ? chroma(color)
          .brighten(1.5)
          .hex()
      : color;
    const offsetColor = withGradient
      ? chroma(color)
          .set('lab.a', '*2.22')
          .hex()
      : color;

    const [luminosity] = chroma(color).lch();
    const textColor = chroma({ h: 0, s: 0, l: luminosity < 50 ? 1 : 0 }).hex('rgba');

    hostElement.nativeElement.style.setProperty(`--presentimental-primary-color`, color);
    hostElement.nativeElement.style.setProperty(`--presentimental-secondary-color`, secondaryColor);
    hostElement.nativeElement.style.setProperty(`--presentimental-offset-color`, offsetColor);
    hostElement.nativeElement.style.setProperty(`--presentimental-primary-text-color`, textColor);
  }
}
