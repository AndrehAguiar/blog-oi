import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';

import * as fromFeedActions from '../../state/feed.actions';
import * as fromFeedSelectors from '../../state/feed.selectors';

import { IFeedState } from '../../state/feed.reducer';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'fd-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnDestroy {

  toggleForm: boolean = false;
  feed!: Feed;

  private componentDestroyed$ = new Subject();

  constructor(private service: FeedService) {
    this.service = service;
  }

  ngOnInit(): void {
  }  

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
  
  onToggleForm(): void {
    this.toggleForm = this.toggleForm ? false : true;
    console.log("FEED ====> " + this.toggleForm);

  }

  createFeed(): void {
    this.service.createFeed(this.feed)
      .subscribe((data: any) => {
        this.feed = data
      });
    this.toggleForm = false;
    console.log("FEED ===> " + this.feed);
  }

  getAllFeeds(): void {
    //this.listFeed = this.service.getFeeds();
  }

}
