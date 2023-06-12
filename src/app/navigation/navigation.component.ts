import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  get loggedIn() {
    return this.authenticationService.loggedIn;
  }

  constructor(private authenticationService: AuthenticationService) {}
}
