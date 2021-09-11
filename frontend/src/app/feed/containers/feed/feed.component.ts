import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Feed } from '../../models/feed.model';
import * as fromConfigActions from '../../state/config/config.actions';
import * as fromConfigSelectos from '../../state/config/config.selectors';
import { IFeatureState } from '../../state/feedmap.reducer';
import * as fromFeedsSelectors from '../../state/feeds/feeds.selectors';



@Component({
  selector: 'fd-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FeedComponent implements OnInit, AfterContentInit ,OnDestroy {

  toggleForm$!: Observable<boolean>;
  showForm!: boolean;
  listFeeds$!: Observable<Array<Feed>>;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<IFeatureState>) { }

  ngOnInit(): void {
    this.onToggleForm()
  }

  ngAfterContentInit(): void {
    
    this.listFeeds$ = this.store.pipe(select(fromFeedsSelectors.selectFeedsEntity));

  }

  onToggleForm(): void {
    
    this.toggleForm$ = this.store.pipe(select(fromConfigSelectos.selectFeedConfig));    
    this.toggleForm$.subscribe(status => {this.showForm = status});    
    this.store.dispatch(fromConfigActions.toggleForm({ showForm: this.showForm ? false : true }));
    
  }

  ngOnDestroy(): void {
    this.onToggleForm()
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
}
