import { AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFeedTypeahead } from '../../models/feed-typeahead.model';
import { Feed } from '../../models/feed.model';
import * as fromCardActions from "../../state/card/card.actions";
import * as fromCardSelectors from "../../state/card/card.selectors";
import { IFeatureState } from '../../state/feedmap.reducer';

@Component({
  selector: 'fd-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FeedCardComponent implements OnInit, AfterContentInit {

  faGithub = faGithub;
  faSearch = faSearch;

  slicedFeedList$!: Observable<Array<Feed>>;
  slicedFeedList!: Array<Feed>;

  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  searchControl!: FormControl;

  @Input() disableSearch!: boolean;
  @Output() eventEnableSearch: EventEmitter<boolean> = new EventEmitter();
  @Output() eventListByName: EventEmitter<boolean> = new EventEmitter();

  @Input() listFeeds$!: Observable<Array<Feed>>;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<IFeatureState>) {
    this.searchControl = new FormControl(undefined);
  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)).subscribe((value: IFeedTypeahead) => {
        if (!!value) {
          this.store.dispatch(fromCardActions.loadFeedsByName({ name: value.name.toString() }))
          this.slicedFeedList$ = this.store.pipe(select(fromCardSelectors.selectCardFeedsEntity));
          this.slicedFeedList$.pipe(takeUntil(this.componentDestroyed$)).subscribe(value => this.slicedFeedList = value);
          this.loading$ = this.store.pipe(select(fromCardSelectors.selectCardFeedsLoading));
          this.error$ = this.store.pipe(select(fromCardSelectors.selectCardFeedsError));
          this.onEnableSearch(false);
        }
      });
  }

  clearSearch(): void {
    this.setListByName(true);
  }

  @Input() onEnableSearch(state: boolean) {
    this.eventEnableSearch.emit(state);
  }

  @Input() setListByName(state: boolean) {
    this.eventListByName.emit(state);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromCardActions.clearCardState());
  }

}
