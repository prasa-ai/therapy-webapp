import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'services-and-resources',
  templateUrl: './services-and-resources.component.html',
  styleUrls: ['./services-and-resources.component.scss']
})
export class ServicesAndResourcesComponent implements OnInit {

  scrollMode = 2;
  pdfSrc = '/assets/pdfs/Jamie-Plesko-JD-Clinical';
  
  constructor() { }

  ngOnInit(): void {
  }

}
