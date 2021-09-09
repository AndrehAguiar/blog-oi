import { Component, Input, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'fd-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  
  faGithub = faGithub;

  constructor() { }

  ngOnInit(): void {
  }

}
