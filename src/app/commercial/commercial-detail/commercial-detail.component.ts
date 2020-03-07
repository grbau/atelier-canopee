import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Project } from '../../models/project.model';
import { Image } from '../../models/image.model';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { FormFieldService } from '../../services/form-field.service';
import { AlertService } from '../../services/alert.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-commercial-detail',
  templateUrl: './commercial-detail.component.html',
})

export class CommercialDetailComponent implements OnInit, AfterViewChecked {

  project: Project[];
  imagesProject: Image[];
  success;
  error;

  formats = ['vertical', 'horizontal'];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  isLogged: boolean;

  showForm = false;


  types = ['Particuliers', 'Commercial', 'Collectif'];

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  private fragment: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      private projectService: ProjectService,
      private userService: UserService,
      private formFieldService: FormFieldService,
      private alertService: AlertService,
      private route: ActivatedRoute,
      private titleService: Title
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.isLogged = this.userService.isLoggedIn();
    setTimeout( () => {
          this.formFieldService.fieldFocusInputElement();
        }, 1000
    );

    this.projectService.getProjectById(this.activatedRoute.snapshot.params.id).subscribe(
        (res: Project[]) => {
          this.project = res;
        },
        (err) => {
          this.error = err;
        }
    );

    this.getImageProjectById(this.activatedRoute.snapshot.params.id);
  }

  ngAfterViewChecked() {
    Array.from(document.querySelectorAll('.lightbox')).forEach(image => {
        image.classList.remove('active');
        if (this.fragment === image.getAttribute('id')) {
            image.classList.add('active');
        }
    });
    if (this.project) {
        this.titleService.setTitle(this.project[0]['title']);
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  getImageProjectById(id): void {
    this.projectService.getImageProject(id).subscribe(
        (res: Project[]) => {
          this.imagesProject = res;
        },
        (err) => {
          this.error = err;
        }
    );
  }

  updateProject(title, subTitle, type, description, location, realisationDate, surface, process,
                image, imageFormat, id) {
    this.success = '';

    this.error = '';

    this.projectService.updateProject({ title, subTitle, type, description, location, realisationDate,
      surface, process, image, imageFormat, id })
        .subscribe(
            (res) => {
              this.project = res;
              this.alertService.success('Le projet ' + this.project[0]['title'] + ' a été bien été modifié');
            },
            (err) => this.alertService.error(err)
        );
  }

  deleteProject(id: number) {
    this.success = '';
    this.error   = '';

    this.projectService.deleteProject(+id)
        .subscribe(
            (res: Project[]) => {
              this.project = res;
              this.alertService.success('Le projet ' + this.project[0]['title'] + ' a été bien été supprimé');
            },
            (err) => this.alertService.error(err)
        );
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
        (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  displayForm() {
    this.showForm = !this.showForm;
    setTimeout( () => {
          this.formFieldService.fieldFocusInputElement();
        }, 1000
    );
  }

}
