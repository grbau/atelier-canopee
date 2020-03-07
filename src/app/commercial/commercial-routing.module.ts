import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommercialComponent } from './commercial.component';
import { CommercialDetailComponent } from './commercial-detail/commercial-detail.component';

const routes: Routes = [
  {
    path: 'commercial',
    component: CommercialComponent,
  },
  {
    path: 'commercial/:id',
    component: CommercialDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [
    RouterModule,
  ]
})
export class CommercialRoutingModule { }
