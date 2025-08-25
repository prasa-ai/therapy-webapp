import { Component } from "@angular/core";

@Component({
    selector: "contacts",
    templateUrl: "./contacts.component.html",
    styleUrls: ["./contacts.component.scss"]
})

export class ContactsComponent {
    activeOption: string = '';

    selectOption(option: string) {
        this.activeOption = option;
        // Remove 'active' class from all options
        document.querySelectorAll('.option').forEach(el => el.classList.remove('active'));
        
        // Find the option element that matches the text
        document.querySelectorAll('.option').forEach(el => {
            if (el.textContent?.trim() === option.charAt(0).toUpperCase() + option.slice(1)) {
                el.classList.add('active');
            }
        });
    }
}