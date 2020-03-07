import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticularModule } from './particular/particular.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { WorkshopComponent } from './workshop/workshop.component';
import { CommercialModule } from './commercial/commercial.module';
import { CollectiveModule } from './collective/collective.module';
import { LocationStrategy, PathLocationStrategy} from '@angular/common';
import { GoogleAnalyticsService } from './services/google-analytics.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    LoginComponent,
    AlertComponent,
    WorkshopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    ParticularModule,
    CommercialModule,
    CollectiveModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
      {provide: LocationStrategy, useClass: PathLocationStrategy},
      UserService,
      AuthGuard,
      AlertService,
      GoogleAnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
