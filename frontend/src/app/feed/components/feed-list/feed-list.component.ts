import { AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feed } from '../../models/feed.model';
import * as fromCardSelectors from '../../state/card/card.selectors';
import * as fromFeedsActions from '../../state/feeds/feeds.actions';
import { IFeedsState } from '../../state/feeds/feeds.reducer';
import * as fromFeedsSelectors from '../../state/feeds/feeds.selectors';

@Component({
  selector: 'fd-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FeedListComponent implements OnInit, AfterContentInit, AfterContentChecked, OnDestroy {

  listFeed$!: Observable<Array<Feed>>;
  listFeed!: Array<Feed>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  isFiltered$!: Observable<boolean>;
  isFiltered!: boolean;

  listFeedByName$!: Observable<Array<Feed>>;
  listFeedByName!: Array<Feed>;

  @Input() isListByName!: boolean;
  @Output() eventToggle: EventEmitter<void> = new EventEmitter();
  @Output() eventList: EventEmitter<void> = new EventEmitter();
  @Output() eventEnableSearch: EventEmitter<boolean> = new EventEmitter();
  @Output() eventResetSearch: EventEmitter<boolean> = new EventEmitter();

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<IFeedsState>) {
  }
  ngAfterContentInit(): void {
    this.isFiltered$.pipe(takeUntil(this.componentDestroyed$)).subscribe(value => this.isFiltered = value);
  }

  ngOnInit(): void {
    this.isFiltered$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsIsFiltered));
    this.store.dispatch(fromFeedsActions.loadFeedsList());
    this.loading$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsLoading));
    this.error$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsError));
    this.loadFeedsList();
  }

  ngAfterContentChecked(): void {
    this.isFiltered$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsIsFiltered));
    if (this.isFiltered) {
      this.loadFeedsListByName();
      this.onEnableSearch(true);
    }
  }

  loadFeedsList(): void {
    this.listFeed$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsEntity));
    this.listFeed$.pipe(takeUntil(this.componentDestroyed$)).subscribe(value => this.listFeed = value);
  }

  loadFeedsListByName(): void {
    this.listFeedByName$ = this.store.pipe(select(fromCardSelectors.selectCardFeedsEntity));
    this.listFeedByName$.pipe(takeUntil(this.componentDestroyed$)).subscribe(value => this.listFeed = value);
  }

  resetList(): void {
    this.store.dispatch(fromFeedsActions.setSlicedFeedsList({ isFiltered: false }));
    this.loadFeedsList();
  }

  @Input() resetCard(): void {
    this.eventResetSearch.emit();
  }

  @Input() onToggleForm(): void {
    this.eventToggle.emit();
  }

  @Input() onEnableSearch(state: boolean) {
    this.eventEnableSearch.emit(state);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromFeedsActions.clearFeedsState());
  }
}
