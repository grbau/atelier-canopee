import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { WorkshopComponent } from './workshop/workshop.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ParticularComponent } from './particular/particular.component';
import { ParticularDetailComponent } from './particular/particular-detail/particular-detail.component';
import { CollectiveComponent } from './collective/collective.component';
import { CollectiveDetailComponent } from './collective/collective-detail/collective-detail.component';
import { CommercialComponent } from './commercial/commercial.component';
import { CommercialDetailComponent } from './commercial/commercial-detail/commercial-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  
  {
    path: 'atelier',
    component: WorkshopComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'particulier',
    component: ParticularComponent,
  },

  {
    path: 'particulier/:id',
    component: ParticularDetailComponent,
  },

  {
    path: 'collectif',
    component: CollectiveComponent,
  },
  {
    path: 'collectif/:id',
    component: CollectiveDetailComponent,
  },

  {
    path: 'commercial',
    component: CommercialComponent,
  },
  {
    path: 'commercial/:id',
    component: CommercialDetailComponent,
  },

  { 
    path: 'not-found',
    component: FourOhFourComponent,
  },
  
  {
     path: '**',
      redirectTo: 'not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
