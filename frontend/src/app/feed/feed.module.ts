import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { FeedFormComponent } from './components/feed-form/feed-form.component';
import { FeedListComponent } from './components/feed-list/feed-list.component';
import { FeedComponent } from './containers/feed/feed.component';
import { FeedRoutingModule } from './feed-routing.module';


@NgModule({
  declarations: [
    FeedComponent,
    FeedFormComponent,
    FeedCardComponent,
    FeedListComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FontAwesomeModule,
  ]
})
export class FeedModule { }
