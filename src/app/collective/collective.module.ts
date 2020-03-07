import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollectiveRoutingModule } from './collective-routing.module';
import { CollectiveComponent } from './collective.component';
import { CollectiveDetailComponent } from './collective-detail/collective-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CollectiveRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    CollectiveComponent,
    CollectiveDetailComponent,
  ],
})
export class CollectiveModule { }
