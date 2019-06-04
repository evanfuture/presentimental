import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentimentalComponent } from './presentimental.component';
import { YoshikoInputComponent } from './components/yoshiko-input/yoshiko-input.component';
import { ModalBaseComponent } from './components/modal-base/modal-base.component';
import { PresentimentalRoutingModule } from './presentimental-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { ValutisFileInputComponent } from './components/valutis-file-input/valutis-file-input.component';
import { ThemingService } from './services/theming.service';

@NgModule({
  declarations: [
    PresentimentalComponent,
    YoshikoInputComponent,
    ModalBaseComponent,
    ValutisFileInputComponent,
  ],
  imports: [
    CommonModule,
    PresentimentalRoutingModule,
    ReactiveFormsModule,
    WebcamModule,
  ],
  providers: [ThemingService],
})
export class PresentimentalModule {}
