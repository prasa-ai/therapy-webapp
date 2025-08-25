import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebParallaxComponent } from './web-parallax.component';

describe('WebParallaxComponent', () => {
  let component: WebParallaxComponent;
  let fixture: ComponentFixture<WebParallaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebParallaxComponent]
    });
    fixture = TestBed.createComponent(WebParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
