import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarsAndEventsComponent } from './services-and-resources.component';

describe('StrategiesComponent', () => {
  let component: WebinarsAndEventsComponent;
  let fixture: ComponentFixture<WebinarsAndEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarsAndEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarsAndEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
