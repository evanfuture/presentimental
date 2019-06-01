import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentimentalComponent } from './presentimental.component';
import { YoshikoInputComponent } from '../yoshiko-input/yoshiko-input.component';
import { ModalBaseComponent } from '../modal-base/modal-base.component';
import { PresentimentalRoutingModule } from './presentimental-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    PresentimentalComponent,
    YoshikoInputComponent,
    ModalBaseComponent,
  ],
  imports: [
    CommonModule,
    PresentimentalRoutingModule,
    ReactiveFormsModule,
    WebcamModule,
  ],
})
export class PresentimentalModule {}
