import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, Input, Output, EventEmitter } from "@angular/core";

export interface CardData {
  state: "default" | "flipped";
}

@Component({
  selector: "flip-card",
  templateUrl: "./flip-card.component.html",
  styleUrls: ["./flip-card.component.scss"],
  animations: [
    trigger("cardFlip", [
      state("default", style({ transform: "none" })),
      state("flipped", style({ transform: "rotateY(180deg)" })),
      transition("default => flipped", [animate("400ms")]),
      transition("flipped => default", [animate("400ms")])
    ])
  ]
})

export class FlipCardComponent {
  @Input() cardId: string = '';
  @Input() frontContent: string = '';
  @Input() backContent: string = '';
  @Input() isFlipped: boolean = false;
  
  @Output() showDetails = new EventEmitter<string>();
  @Output() cardToggled = new EventEmitter<string>();

  @Output() detailsClicked = new EventEmitter<boolean>();

  // Flip state is controlled by the parent component's isFlipped input
  get flipState() {
    return this.isFlipped ? "flipped" : "default";
  }

  // Emits cardToggled when the card is clicked
  cardClicked() {
    this.cardToggled.emit(this.cardId);
  }

  // Emits showDetails when "View Details" is clicked
  /* openDetails(event: Event) {
    event.stopPropagation(); // Prevents flipping back on detail click
    this.showDetails.emit(this.cardId);
    this.detailsClicked.emit(this.isFlipped); // To open card-blowup div in home.component.html
  } */
}