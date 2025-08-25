import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Honeycomb';

  toggleActive(event: any) {
    // Remove 'active' class from all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('active'));

    // Add 'active' class to the clicked card
    const clickedCard = event.currentTarget;
    clickedCard.classList.add('active');
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: Event) {
    const targetElement = event.target as HTMLElement;

    // Check if the click was outside the cards
    if (!targetElement.closest('.card')) {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => card.classList.remove('active'));
    }
  }
}
