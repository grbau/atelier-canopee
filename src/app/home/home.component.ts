import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private projectService: ProjectService,
      private titleService: Title,
      private meta: Meta,
      ) { }

  projects: Project[];
  error = '';
  title = 'Atelier canopée';

  ngOnInit() {
    this.getHomeProjects();
    this.titleService.setTitle(this.title);
    this.meta.addTag({name: 'keywords', content: 'Atelier canopee architecte'});
    this.meta.addTag({name: 'description', content: 'Atelier canopee architecte'});
  }

  getHomeProjects(): void {
    this.projectService.getHomeProject().subscribe(
        (res: Project[]) => {
          this.projects = res;
        },
        (err) => {
          this.error = err;
        }
    );
  }

}
