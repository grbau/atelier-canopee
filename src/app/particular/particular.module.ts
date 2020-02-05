import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParticularRoutingModule } from './particular-routing.module';
import { ParticularComponent } from './particular.component';
import { FormsModule } from '@angular/forms';
import { ParticularDetailComponent } from './particular-detail/particular-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ParticularRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    ParticularComponent,
    ParticularDetailComponent,
  ],
})
export class ParticularModule { }
