import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feed } from '../../models/feed.model';
import * as fromFeedsActions from '../../state/feeds/feeds.actions';
import { IFeedsState } from '../../state/feeds/feeds.reducer';
import * as fromFeedsSelectors from '../../state/feeds/feeds.selectors';

@Component({
  selector: 'fd-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FeedListComponent implements OnInit, OnDestroy {

  @Output() eventToggle: EventEmitter<void> = new EventEmitter();
  @Output() eventList: EventEmitter<any> = new EventEmitter();

  listFeed$!: Observable<Array<Feed>>;
  listFeed!: Array<Feed>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<IFeedsState>) {
  }

  ngOnInit(): void {

    this.store.dispatch(fromFeedsActions.loadFeedsList());

    this.listFeed$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsEntity));

    this.listFeed$.pipe(takeUntil(this.componentDestroyed$)).subscribe(value => this.listFeed = value);

    this.loading$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsLoading));

    this.error$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsError));

  }

  @Input() onToggleForm(): void {
    this.eventToggle.emit();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromFeedsActions.clearFeedsState());
  }
}
