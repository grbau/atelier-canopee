import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

declare let ga: any;

@Injectable({
  providedIn: 'root'
})


export class GoogleAnalyticsService {

  private subscription: Subscription;

  constructor(private router: Router) { }

  public subscribe() {
    if (!this.subscription) {
      // subscribe to any router navigation and once it ends, write out the google script notices
      this.subscription = this.router.events.subscribe( e => {
        if (e instanceof NavigationEnd) {
          // this will find & use the ga function pulled via the google scripts
          try {
            ga('set', 'page', e.urlAfterRedirects);
            ga('send', 'pageview');
            console.log(`logging: ${e.urlAfterRedirects} to google analytics`);
          } catch {
            console.log('tracking not found - make sure you installed the scripts');
          }
        }
      });
    }
  }

  public unsubscribe() {
    if (this.subscription) {
      // --- clear our observable subscription
      this.subscription.unsubscribe();
    }
  }
}
