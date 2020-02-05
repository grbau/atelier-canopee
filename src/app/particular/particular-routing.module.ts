import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticularComponent } from './particular.component';
import { ParticularDetailComponent } from './particular-detail/particular-detail.component';

const routes: Routes = [
  {
    path: 'particulier',
    component: ParticularComponent,
  },
  {
    path: 'particulier/:id',
    component: ParticularDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [
    RouterModule,
  ]
})
export class ParticularRoutingModule { }
