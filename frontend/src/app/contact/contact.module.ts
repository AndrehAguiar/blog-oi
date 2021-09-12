import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComponentsModule } from '../shared/components/components.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './containers/contact/contact.component';
import { ContactEffects } from './state/contact.effects';
import { contactReducer } from './state/contact.reducer';

@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    StoreModule.forFeature('contact', contactReducer),
    EffectsModule.forFeature([ContactEffects]),
  ]
})
export class ContactModule { }
