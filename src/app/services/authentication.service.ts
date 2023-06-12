import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _loggedIn = false;

  get loggedIn() {
    return this._loggedIn;
  }
}
