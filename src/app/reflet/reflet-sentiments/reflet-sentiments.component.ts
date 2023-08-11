import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-reflet-sentiments',
	templateUrl: './reflet-sentiments.component.html',
	styleUrls: ['./reflet-sentiments.component.scss'],
})
export class RefletSentimentsComponent {
	@ViewChild('formBoxWrapper') formBoxWrapper!: ElementRef;
	@ViewChild('formBox') formBox!: ElementRef;

	toggleMenu() {
		if (!this.formBoxWrapper || !this.formBox) {
			return;
		}

		const height = this.formBoxWrapper?.nativeElement.style.height;

		console.log(height);

		if (height && height !== '0px') {
			this.formBoxWrapper.nativeElement.style.height = 0;
		} else {
			const formBoxHeight =
				this.formBox.nativeElement.getBoundingClientRect().height;
			this.formBoxWrapper.nativeElement.style.height = `${formBoxHeight}px`;
		}
	}
}
