import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { FormFieldService } from '../services/form-field.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-particular',
  templateUrl: './particular.component.html',
  styleUrls: ['./particular.component.scss']
})
export class ParticularComponent implements OnInit {

  project = new Project('', '', '', '', '', '', 0, '', '', '');

  projects: Project[];

  isLogged: boolean;

  types = ['Particulier', 'Commercial', 'Collectif'];

  formats = ['vertical', 'horizontal'];

  error = '';
  success: string;

  showForm = false;

  title = 'Particuliers';

  constructor(
      private projectService: ProjectService,
      private userService: UserService,
      private alertService: AlertService,
      private formFieldService: FormFieldService,
      private titleService: Title,
      private meta: Meta
      ) { }

  ngOnInit() {
      this.titleService.setTitle(this.title);
      this.meta.addTag({name: 'keywords', content: 'Atelier canopee architecte'});
      this.meta.addTag({name: 'description', content: 'Atelier canopee architecte'});
      this.getParticularProjects();
      this.isLogged = this.userService.isLoggedIn();
      setTimeout( () => {
          this.formFieldService.fieldFocusInputElement();
      }, 1000
      );
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

  addProject(f: NgForm) {
    this.error = '';
    this.success = '';

    this.projectService.addProject(this.project)
        .subscribe(
            (res: Project[]) => {
              // Update the list of cars
              this.projects = res;

              // Inform the user
              this.alertService.success('Le projet ' + this.project['title'] + ' a été ajouté avec succès');

              // Reset the form
              f.reset();
            },
            (err) => this.alertService.error(err)
        );
  }

  displayForm() {
      this.showForm = !this.showForm;
      setTimeout( () => {
              this.formFieldService.fieldFocusInputElement();
          }, 1000
      );
  }
}
