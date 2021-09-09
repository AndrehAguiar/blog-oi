import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedComponent } from './containers/feed/feed.component';
import { FeedRoutingModule } from './feed-routing.module';


@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
  ]
})
export class FeedModule { }
