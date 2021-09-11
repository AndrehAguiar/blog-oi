import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFeedTypeahead } from '../../models/feed-typeahead.model';
import { Feed } from '../../models/feed.model';
import { ICardState } from '../../state/card/card.reducer';
import * as fromCardActions from "../../state/card/card.actions";
import * as fromCardSelectors from "../../state/card/card.selectors";

@Component({
  selector: 'fd-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedCardComponent implements OnInit, AfterContentInit {

  faGithub = faGithub;
  faSearch = faSearch;

  listNameFeed$!: Observable<Array<Feed>>;
  listNameFeed!: Array<Feed>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  @Input() listFeeds$!: Observable<Array<Feed>>;

  searchControl!: FormControl;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<ICardState>) { }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    
    this.searchControl = new FormControl(undefined);

    this.searchControl.valueChanges.pipe(
      takeUntil(this.componentDestroyed$))
      .subscribe((value: IFeedTypeahead) => {
        if (!!value) {
          this.store.dispatch(fromCardActions.loadFeedsByName({ name: value.name.toString() })
          )
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
