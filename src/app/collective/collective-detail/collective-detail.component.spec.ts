import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiveDetailComponent } from './collective-detail.component';

describe('CollectiveDetailComponent', () => {
  let component: CollectiveDetailComponent;
  let fixture: ComponentFixture<CollectiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
