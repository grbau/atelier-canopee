import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularDetailComponent } from './particular-detail.component';

describe('ParticularDetailComponent', () => {
  let component: ParticularDetailComponent;
  let fixture: ComponentFixture<ParticularDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
