import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../interfaces/blog-posts";


@Injectable({
    providedIn: 'root'
})

export class BlogService {
    
    constructor(private httpClient: HttpClient) {}

    blogPostsFile = 'assets/data/blog-posts.json'

    getBlogPosts() {
        return this.httpClient.get<Post[]>(this.blogPostsFile);
    }

}


