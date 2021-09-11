import { AfterContentChecked, ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { Observable, of, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IFeedTypeahead } from '../../models/feed-typeahead.model';
import { Feed } from '../../models/feed.model';

@Component({
  selector: 'fd-feed-typeahead',
  templateUrl: './feed-typeahead.component.html',
  styleUrls: ['./feed-typeahead.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedTypeaheadComponent implements OnInit, AfterContentChecked, ControlValueAccessor {

  dataSource$!: Observable<Array<IFeedTypeahead>>;

  search!: string;

  feed!: IFeedTypeahead;

  loading!: any;
  disabled!: boolean;
  private onTouched!: () => void;
  private onChange!: (value: IFeedTypeahead) => void;

  @Input() listFeeds$!: Observable<Array<Feed>>;
  listFeedsNames!: Array<IFeedTypeahead>;

  constructor(@Optional() @Self() public control: NgControl) {
    control.valueAccessor = this;
  }

  ngAfterContentChecked(): void {

  }

  ngOnInit(): void {

    this.loadDataSource();

    this.dataSource$ = new Observable(
      (subscriber: Subscriber<string>) => subscriber.next(this.search))
      .pipe(switchMap((query: string) => of(this.listFeedsNames
        .filter(f => f.name.toLocaleLowerCase().indexOf(
          query.toLocaleLowerCase()) > - 1).slice(0, 10))));
  }

  loadDataSource(): void {

    this.listFeedsNames = new Array<IFeedTypeahead>();

    this.listFeeds$.subscribe(
      listFeeds => listFeeds.some(
        (feed: Feed) => {
          if (!this.listFeedsNames.some((user) => user.name == feed.name)) {
            this.listFeedsNames.push({ name: feed.name });
          }
        }));

    this.dataSource$ = of(this.listFeedsNames);
  }

  onSelected(match: TypeaheadMatch) {
    this.onTouched();
    this.onChange(match.item);
  }

  registerOnChange(fn: (value: IFeedTypeahead) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(feed: Feed): void {
    this.feed = feed;
  }

}
