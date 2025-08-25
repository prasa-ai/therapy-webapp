import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { PostComponent } from './post/post.component';


const routes = [{ path: '', component: BlogComponent }]

@NgModule({
  declarations: [BlogComponent, PostComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    PaginatorModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule { }