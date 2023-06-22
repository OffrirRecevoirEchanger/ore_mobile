import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

	login() {
		console.log('Submitted');
	}

	isInvalid(control: AbstractControl) {
		return control.errors && (control.touched || control.dirty);
	}
}
