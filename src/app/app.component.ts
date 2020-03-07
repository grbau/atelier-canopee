import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from './models/project.model';
import { ProjectService } from './services/project.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  projects: Project[];
  error = '';
  success = '';

  constructor(
      private projectService: ProjectService,
      private meta: Meta,
      private googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit(): void {
    this.getProjects();
    // this.googleAnalyticsService.subscribe();
    this.meta.addTag({name: 'google-site-verification', content: 'pPb9h0ymN4R9x7kzXDm6sqHUjg8V_AoDDGOVgtUl4Ds'});
  }

  getProjects(): void {
    this.projectService.getAll().subscribe(
        (res: Project[]) => {
          this.projects = res;
        },
        (err) => {
          this.error = err;
        }
    );
  }

  ngOnDestroy() {
    // unsubscribe to the post
    // this.googleAnalyticsService.unsubscribe();
  }
}
