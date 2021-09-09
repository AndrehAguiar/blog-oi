import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeedComponent } from './containers/feed/feed.component';
import { FeedRoutingModule } from './feed-routing.module';


@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FontAwesomeModule, 
  ]
})
export class FeedModule { }
