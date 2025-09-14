import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(30px)'
        }),
        animate('600ms ease-out')
      ])
    ]),
    trigger('slideInLeft', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-50px)'
        }),
        animate('800ms ease-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ])
    ]),
    trigger('slideInRight', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(50px)'
        }),
        animate('800ms ease-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ])
    ])
  ]
})

export class AboutMeComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Component initialization logic
    this.scrollToTop();
  }

  /**
   * Scroll to top of page when component loads
   */
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Handle schedule consultation button click
   */
  scheduleConsultation(): void {
    // Navigate to scheduling page or open scheduling modal
    // For now, we'll navigate to a contact page with consultation query
    this.router.navigate(['/contact'], { 
      queryParams: { type: 'consultation' } 
    });
  }

  /**
   * Handle contact us button click
   */
  contactUs(): void {
    // Navigate to general contact page
    this.router.navigate(['/contacts']);
  }

  /**
   * Handle navigation to services page
   */
  viewServices(): void {
    this.router.navigate(['/services-and-resources']);
  }

  /**
   * Handle phone call action
   */
  callOffice(): void {
    window.open('tel:(123) 456-7890', '_self');
  }

  /**
   * Handle email action
   */
  sendEmail(): void {
    window.open('mailto:info@nexphase-therapy.com?subject=Therapy Inquiry', '_self');
  }

  /**
   * Navigate to home page
   */
  goHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Smooth scroll to specific section
   * @param elementId - ID of the element to scroll to
   */
  scrollToSection(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  /**
   * Track by function for ngFor performance optimization
   * @param index - array index
   * @param item - array item
   * @returns unique identifier for tracking
   */
  trackByIndex(index: number, item: any): number {
    return index;
  }
  
}





// about-us.component.ts


// @Component({
//   selector: 'app-about-us',
//   templateUrl: './about-us.component.html',
//   styleUrls: ['./about-us.component.scss'],
//   animations: [
//     trigger('fadeInUp', [
//       state('in', style({opacity: 1, transform: 'translateY(0)'})),
//       transition('void => *', [
//         style({
//           opacity: 0,
//           transform: 'translateY(30px)'
//         }),
//         animate('600ms ease-out')
//       ])
//     ]),
//     trigger('slideInLeft', [
//       transition('void => *', [
//         style({
//           opacity: 0,
//           transform: 'translateX(-50px)'
//         }),
//         animate('800ms ease-out', style({
//           opacity: 1,
//           transform: 'translateX(0)'
//         }))
//       ])
//     ]),
//     trigger('slideInRight', [
//       transition('void => *', [
//         style({
//           opacity: 0,
//           transform: 'translateX(50px)'
//         }),
//         animate('800ms ease-out', style({
//           opacity: 1,
//           transform: 'translateX(0)'
//         }))
//       ])
//     ])
//   ]
// })
// export class AboutUsComponent implements OnInit {

// }