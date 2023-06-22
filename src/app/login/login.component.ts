import { Component, ElementRef, ViewChild } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ApiAuthenticationService } from '../services/api-authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	@ViewChild('loginForm') loginForm!: ElementRef;
	loginFormGroup = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	get usernameControl() {
		return this.loginFormGroup.get('username');
	}

	get passwordControl() {
		return this.loginFormGroup.get('password');
	}

	constructor(private apiAuthenticationService: ApiAuthenticationService) {}

	login() {
		if (this.loginFormGroup.invalid) {
			this.loginFormGroup.markAllAsTouched();
			return;
		}

		this.apiAuthenticationService
			.authenticate(
				this.usernameControl?.value || '',
				this.passwordControl?.value || ''
			)
			.subscribe((response) => {
				console.log(response);
			});
	}

	isInvalid(control: AbstractControl) {
		return control.errors && (control.touched || control.dirty);
	}
}
