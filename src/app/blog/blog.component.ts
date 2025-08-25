import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/blog-posts';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  /* posts: Post[] = posts; */
  blogPosts: Post[] = []
  paginatedPosts: Post[] = [];
  rows = 5; //Number of posts per page
  first = 0;
  totalRecords = 0;

  selectedPost: Post | null = null;

  constructor(public router: Router, private blogPostsService: BlogService) { }

  ngOnInit(): void {

    this.blogPostsService.getBlogPosts().subscribe((data) => {
      this.blogPosts = data;
      this.blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); //Order the posts chronologically with the most recent first.
      this.paginate({ first: this.first, rows: this.rows });
      this.totalRecords = this.blogPosts.length;
    });

  }

  clickedFromChild() {
    alert("child component summary clicked and I am in parent")
  }

  // Pagination
  paginate(event: { first: number, rows: number }) {
    this.first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    const end = this.first + rows;
    this.paginatedPosts = this.blogPosts.slice(this.first, end);
  }

  viewPost(post: Post) {
    this.selectedPost = post;
  }

  backToList() {
    this.selectedPost = null;
  }
}
