import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { Image } from '../../models/image.model';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-particular-detail',
  templateUrl: './particular-detail.component.html',
  styleUrls: ['./particular-detail.component.scss']
})
export class ParticularDetailComponent implements OnInit {

  project: Project[];
  imagesProject: Image[];
  error;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
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

  getImageProjectById(id): void {
    this.projectService.getImageProject(id).subscribe(
        (res: Project[]) => {
          this.imagesProject = res;
          console.log(this.imagesProject);
        },
        (err) => {
          this.error = err;
        }
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

}
