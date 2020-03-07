import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { NgForm } from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {FormFieldService} from '../services/form-field.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new Contact('', '', '', '', null);
  submitted = false;
  error: {};
  contact: Contact[];
  success;
  title = 'Formulaire de contact'

  constructor(
      private router: Router,
      private contactService: ContactService,
      private alertService: AlertService,
      private formFieldService: FormFieldService,
      private titleService: Title,
      private meta: Meta
  ) { }

  ngOnInit() {
      this.titleService.setTitle(this.title);
      this.meta.addTag({name: 'keywords', content: 'Atelier canopee architecte'});
      this.meta.addTag({name: 'description', content: 'Atelier canopee architecte'});
      this.formFieldService.fieldFocusInputElement();
  }

  addContact(contactForm: NgForm) {
    this.submitted = true;
    this.error = '';
    this.success = '';
    this.contactService.contactForm(this.model)
        .subscribe(
            (res: Contact[]) => {
              // Update the list of contact
              this.contact = res;
              console.log(this.contact);

              // Inform the user
              this.success = 'Created successfully';
              this.alertService.success('Votre message à bien été envoyé!');

              // Reset the form
              contactForm.reset();
            },
            (err) => this.error = err
        );
  }

  alertSuccess(message: string) {
      console.log(message);
      this.alertService.success(message);
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

}
