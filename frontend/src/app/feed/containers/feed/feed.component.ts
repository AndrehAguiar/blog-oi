import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Feed } from '../../models/feed.model';


@Component({
  selector: 'fd-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {

  toggleForm: boolean = true;
  feed!: Feed;

  constructor() {}

  ngOnInit(): void {
  }
  
  onToggleForm(): void {
    this.toggleForm = this.toggleForm ? false : true;
    console.log("FEED ====> " + this.toggleForm);

  }

}
