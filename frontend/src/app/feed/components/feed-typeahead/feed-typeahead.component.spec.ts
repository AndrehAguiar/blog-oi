import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTypeaheadComponent } from './feed-typeahead.component';

describe('FeedTypeaheadComponent', () => {
  let component: FeedTypeaheadComponent;
  let fixture: ComponentFixture<FeedTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedTypeaheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
