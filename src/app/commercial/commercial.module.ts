import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommercialComponent } from './commercial.component';
import { CommercialRoutingModule } from './commercial-routing.module';
import { CommercialDetailComponent } from './commercial-detail/commercial-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CommercialRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    CommercialComponent,
    CommercialDetailComponent,
  ],
})
export class CommercialModule { }
