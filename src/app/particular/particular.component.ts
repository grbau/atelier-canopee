import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-particular',
  templateUrl: './particular.component.html',
  styleUrls: ['./particular.component.scss']
})
export class ParticularComponent implements OnInit {

  project = new Project('', '', '', '', new Date(), 0, '');

  projects: Project[];

  types = ['Particuliers', 'Commercial', 'Collectif'];

  error = '';
  success = '';

  constructor(private projectService: ProjectService) { }

  public fileUpload: File = null;

  ngOnInit() {
      this.getParticularProjects();
  }

  getParticularProjects(): void {
    this.projectService.getParticularProjects().subscribe(
        (res: Project[]) => {
            this.projects = res;
        },
        (err) => {
            this.error = err;
        }
    );
  }

  handleFileInput(file) {
      this.fileUpload = file;
  }

  addProject(f: NgForm) {
    this.error = '';
    this.success = '';

    const formData = new FormData();
    formData.append('image', this.fileUpload, this.fileUpload.name);

    this.projectService.addProject(this.project)
        .subscribe(
            (res: Project[]) => {
              // Update the list of cars
              this.projects = res;

              // Inform the user
              this.success = 'Created successfully';

              // Reset the form
              f.reset();
            },
            (err) => this.error = err
        );
  }


}
