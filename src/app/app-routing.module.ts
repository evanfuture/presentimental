import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'presentimental',
      pathMatch: 'full',
    },
    {
      path: 'presentimental',
      loadChildren: () => import('./presentimental/presentimental.module').then(mod => mod.PresentimentalModule),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
