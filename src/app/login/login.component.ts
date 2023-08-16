import { Component, ElementRef, ViewChild } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

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

	get usernameControl(): any {
		return this.loginFormGroup.get('username');
	}

	get passwordControl(): any {
		return this.loginFormGroup.get('password');
	}

	constructor(
		private accountService: AccountService,
		private router: Router
	) {}

	login(): void {
		if (this.loginFormGroup.invalid) {
			this.loginFormGroup.markAllAsTouched();
			return;
		}

		this.accountService
			.login(
				this.usernameControl?.value || '',
				this.passwordControl?.value || ''
			)
			.subscribe((response) => {
				this.accountService.user = response;
				this.router.navigate(['/reflet/réseau']);
			});
	}

	isInvalid(control: AbstractControl): boolean | null {
		return control.errors && (control.touched || control.dirty);
	}
}
