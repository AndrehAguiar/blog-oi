import { AfterContentChecked, AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Feed } from '../../models/feed.model';
import * as fromCardActions from '../../state/card/card.actions';
import * as fromConfigActions from '../../state/config/config.actions';
import * as fromConfigSelectos from '../../state/config/config.selectors';
import { IFeatureState } from '../../state/feedmap.reducer';
import * as fromFeedsActions from '../../state/feeds/feeds.actions';
import * as fromFeedsSelectors from '../../state/feeds/feeds.selectors';

@Component({
  selector: 'fd-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit, AfterContentInit, AfterContentChecked, OnDestroy {

  toggleForm$!: Observable<boolean>;
  showForm!: boolean;

  disableSearch$!: Observable<boolean>;
  disableSearch!: boolean;

  isListByName$!: Observable<boolean>;
  isListByName!: boolean;

  listFeeds$!: Observable<Array<Feed>>;
  private componentDestroyed$ = new Subject();

  constructor(private store: Store<IFeatureState>) { }

  ngOnInit(): void {
    this.onToggleForm();
    this.onEnableSearch(true);
  }

  ngAfterContentInit(): void {
    this.listFeeds$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsEntity));
  }

  ngAfterContentChecked(): void {
    this.isListByName$ = this.store.pipe(select(fromConfigSelectos.selectListByName));
  }

  onToggleForm(): void {
    this.toggleForm$ = this.store.pipe(select(fromConfigSelectos.selectFormConfig));
    this.toggleForm$.subscribe(status => { this.showForm = status });
    this.store.dispatch(fromConfigActions.toggleForm({ showForm: this.showForm ? false : true }));
    if (this.isListByName) this.resetCard();
  }

  onEnableSearch(state: boolean): void {
    this.disableSearch$ = this.store.pipe(select(fromConfigSelectos.selectSearchConfig));
    this.disableSearch$.subscribe(status => { this.disableSearch = status });
    this.store.dispatch(fromConfigActions.enableSearchButton({ disableSearch: state }))
  }

  setListByName(state: boolean): void {
    this.isListByName$ = this.store.pipe(select(fromConfigSelectos.selectListByName));
    this.isListByName$.subscribe(status => { this.isListByName = status });
    this.store.dispatch(fromConfigActions.loadListByName({ listIsByName: state }));
    this.store.dispatch(fromFeedsActions.setSlicedFeedsList({ isFiltered: this.isListByName }));
    this.onEnableSearch(false)
  }

  resetCard(): void {
    this.store.dispatch(fromCardActions.clearCardState());
    this.store.dispatch(fromConfigActions.loadListByName({ listIsByName: false }));
  }

  ngOnDestroy(): void {
    this.onToggleForm()
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
}
