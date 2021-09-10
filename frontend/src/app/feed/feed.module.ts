import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComponentsModule } from '../shared/components/components.module';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { FeedFormComponent } from './components/feed-form/feed-form.component';
import { FeedListComponent } from './components/feed-list/feed-list.component';
import { FeedComponent } from './containers/feed/feed.component';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedEffects } from './state/feed/feed.effects';
import { reducerMap } from './state/feedmap.reducer';
import { FeedsEffects } from './state/feeds/feeds.effects';


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
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('feedModule', reducerMap),
    EffectsModule.forFeature([FeedEffects, FeedsEffects]),
    ComponentsModule,
  ]
})
export class FeedModule { }
