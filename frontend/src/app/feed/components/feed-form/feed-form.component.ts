import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'fd-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedFormComponent implements OnInit {

  feed!: Feed;
  feedForm: FormGroup;
  @Output() createdFeed: EventEmitter<Feed> = new EventEmitter();

  constructor(private service: FeedService,
              private formBuilder: FormBuilder) {
    
    this.service = service;
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

  @Input() createFeed(feed: Feed): void {
      this.createdFeed.emit(this.feed);
  }

  onSubmit() {  
    this.createFeed(this.feedForm.value);
  }

  get name() {return this.feedForm.controls.name }
  get message() {return this.feedForm.controls.message }

}
