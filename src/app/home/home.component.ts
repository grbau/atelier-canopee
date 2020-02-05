import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  projects: Project[];
  error = '';

  ngOnInit() {
    this.getHomeProjects();
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
