import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as fromConfigSelectos from '../../state/config/config.selectors';
import * as fromConfigActions from '../../state/config/config.actions';


@Component({
  selector: 'fd-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FeedComponent implements OnInit,OnDestroy {

  toggleForm$!: Observable<boolean>;
  showForm!: boolean;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.onToggleForm()
  }

  onToggleForm(): void {
    
    this.toggleForm$ = this.store.pipe(select(fromConfigSelectos.selectFeedConfig));
    
    this.toggleForm$.subscribe(status => {this.showForm = status});
    this.showForm = this.showForm ? false : true;
    
    this.store.dispatch(fromConfigActions.toggleForm({ showForm: this.showForm }));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
}
