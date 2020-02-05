import { Component, OnInit } from '@angular/core';
import { Project } from './models/project.model';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ateliercanopee';

  projects: Project[];
  error = '';
  success = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
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
}
