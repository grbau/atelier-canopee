import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectiveComponent } from './collective.component';
import { CollectiveDetailComponent } from './collective-detail/collective-detail.component';

const routes: Routes = [
  {
    path: 'collectif',
    component: CollectiveComponent,
  },
  {
    path: 'collectif/:id',
    component: CollectiveDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [
    RouterModule,
  ]
})
export class CollectiveRoutingModule { }
