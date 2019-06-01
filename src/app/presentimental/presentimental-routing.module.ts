import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PresentimentalComponent } from './presentimental.component';

const routes: Routes = [
  {
    path: '',
    component: PresentimentalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresentimentalRoutingModule {}
