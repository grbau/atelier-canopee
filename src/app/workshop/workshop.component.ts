import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {

  title = 'L\'Atelier';

  constructor(private titleService: Title, private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.addTag({name: 'keywords', content: 'Atelier canopee architecte'});
    this.meta.addTag({name: 'description', content: 'Atelier canopee architecte'});
  }

}
