import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Feed } from '../../models/feed.model';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'fd-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.css']
})
export class FeedFormComponent implements OnInit {

  feed!: Feed;
  feedForm: FormGroup;

  constructor(private service: FeedService,
              private formBuilder: FormBuilder) {
    
    this.service = service;
    
    this.feedForm = this.formBuilder.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      feedMessage: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }

  ngOnInit(): void {
  }

  createFeed() {
    this.service.createFeed(this.feed)
      .subscribe((data: any) => {
        this.feed = data
      })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.feedForm.value);
  }

  get userName() {return this.feedForm.controls.userName }
  get feedMessage() {return this.feedForm.controls.feedMessage }

}
