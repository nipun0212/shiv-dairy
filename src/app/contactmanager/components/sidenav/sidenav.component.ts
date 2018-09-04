import { Component, OnInit, ApplicationRef, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  users: Observable<User[]>;

  constructor(
    private zone: NgZone,
    private userService: UserService,
    private router: Router,
    private app: ApplicationRef
  ) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  ngOnInit() {
    this.app.tick()
    this.users = this.userService.users;
    this.userService.loadAll();
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    })
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
  navigateTo(loc) {
    this.app.tick()
    this.zone.run(() => this.router.navigate([loc]));
  }
}
