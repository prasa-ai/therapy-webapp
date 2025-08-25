import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/interfaces/blog-posts';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  @Input() postItem: Post | undefined;
  @Output() myChildClick: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  summaryClicked() {
    this.myChildClick.emit();
  }

}
