import { Component, OnInit } from '@angular/core';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'fd-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  feed!: Feed;
  listFeed!: Array<Feed>;

  constructor(private service: FeedService) {
    this.service = service;
  }

  ngOnInit(): void {    
    this.getAllFeeds()
  }

  getAllFeeds(): void{
    const response = this.service.getFeeds()
    .subscribe((data: any) => {      
      this.listFeed = data;
    });
  }

}
