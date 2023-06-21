import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	loginFormGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
	});

	get username() {
		return this.loginFormGroup.get('username')?.value;
	}

	get password() {
		return this.loginFormGroup.get('password')?.value;
	}

	login() {
		console.log('Submitted');
	}
}
