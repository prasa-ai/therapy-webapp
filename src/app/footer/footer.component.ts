import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {
    if (!this.isValidEmail(this.email)) {
      alert('The email address in the footer needs reviewing');
    }
  }

  phone: number = 8047355268;
  email: string = 'jamie@nex-phase.com';
  address: string = '9844 Lori Rd, Ste 100, Chesterfield, VA';

  ngOnInit(): void {
  }

  isValidEmail(email: string): boolean {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
