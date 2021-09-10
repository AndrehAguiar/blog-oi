import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';
import * as fromFeedActions from '../../state/feed.actions';
import { IFeedState } from '../../state/feed.reducer';
import * as fromFeedSelectors from '../../state/feed.selectors';

@Component({
  selector: 'fd-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedListComponent implements OnInit {

  @Output() loadedFeeds: EventEmitter<Feed[]> = new EventEmitter();
  @Output() eventToggle: EventEmitter<boolean> = new EventEmitter();

  listFeed$!: Observable<Feed[]>;
  listFeed!: Feed[];
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<IFeedState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromFeedActions.loadFeedList());

    this.listFeed$ = this.store.pipe(select(fromFeedSelectors.selectFeedEntity));

    this.listFeed$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => this.listFeed = value)

    this.loading$ = this.store.pipe(select(fromFeedSelectors.selectFeedError));

    this.error$ = this.store.pipe(select(fromFeedSelectors.selectFeedError))
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  @Input() getAllFeeds(): void {
    this.loadedFeeds.emit();
  }

  @Input() onToggleForm(): void {
    this.eventToggle.emit(true)
  }
}
