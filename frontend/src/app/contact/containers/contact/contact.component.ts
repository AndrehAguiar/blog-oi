import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromContactActions from '../../state/contact.actions';
import { IContactState } from '../../state/contact.reducer';
import * as fromContactSelectors from '../../state/contact.selectors';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ContactComponent implements OnInit, OnDestroy {

  @Output() eventEmail: EventEmitter<Event> = new EventEmitter();

  sending$!: Observable<boolean>;
  error$!: Observable<boolean>;
  result$!: Observable<number>;
  result!: number;

  contactForm: FormGroup;

  private componentDestroyed$ = new Subject();

  constructor(private formBuilder: FormBuilder, private store: Store<IContactState>) {
    this.contactForm = this.formBuilder.group({
      contactName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      contactMessage: new FormControl('', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(250)
      ]),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(fromContactActions.clearContactState());
    this.result$ = this.store.pipe(select(fromContactSelectors.selectContactSending));
  }
  get contactName() { return this.contactForm.controls.contactName; }
  get contactEmail() { return this.contactForm.controls.contactEmail }
  get contactMessage() { return this.contactForm.controls.contactMessage }

  onSubmit(e: Event) {
    this.store.dispatch(fromContactActions.sendContact({ event: e }));
    this.result$.pipe(takeUntil(this.componentDestroyed$)).subscribe((value => this.result = value));
    this.sending$ = this.store.pipe(select(fromContactSelectors.selectContactSuccess))
    this.error$ = this.store.pipe(select(fromContactSelectors.selectContactError));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromContactActions.clearContactState());
  }
}
