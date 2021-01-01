import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges {
  @Input() loggedIn: boolean
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes)
  }
}
