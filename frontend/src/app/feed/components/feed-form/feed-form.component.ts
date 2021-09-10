import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Feed } from '../../models/feed.model';
import * as fromFeedSelectors from '../../state/feed.selectors';
import * as fromFeedActions from '../../state/feed.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fd-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedFormComponent implements OnInit, OnDestroy {

  feed$!: Observable<Feed>;
  feed!: Feed;
  saving$!: Observable<boolean>;
  error$!: Observable<boolean>;

  feedForm: FormGroup;
  @Output() eventToggle: EventEmitter<boolean> = new EventEmitter();

  private componentDestroyed$ = new Subject();

  constructor(private store: Store,
    private formBuilder: FormBuilder) {
    this.feed = new Feed();

    this.feedForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    const entity = this.feedForm.value
    
    this.store.dispatch(fromFeedActions.createNewFeed(entity));

    this.feed$ = this.store.pipe(select(fromFeedSelectors.selectFeedEntity));

    //this.feed$.pipe(takeUntil(this.componentDestroyed$))
    //.subscribe(value => this.feed = value);

    this.saving$ = this.store.pipe(select(fromFeedSelectors.selectFeedSaving));

    this.error$ = this.store.pipe(select(fromFeedSelectors.selectFeedError));

    this.onToggleForm();
  }  

  @Input() onToggleForm(): void {
    this.eventToggle.emit();
  }

  get name() { return this.feedForm.controls.name }
  get message() { return this.feedForm.controls.message }
  

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
