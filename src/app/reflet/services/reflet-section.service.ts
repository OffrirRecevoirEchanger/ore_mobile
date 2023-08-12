import { ElementRef, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class RefletSectionService {
	constructor() {}

	toggleMenu(formBoxWrapper: ElementRef, formBox: ElementRef): void {
		if (!formBoxWrapper || !formBox) {
			return;
		}

		const height = formBoxWrapper?.nativeElement.style.height;

		if (height && height !== '0px') {
			formBoxWrapper.nativeElement.style.height = 0;
		} else {
			const formBoxHeight =
				formBox.nativeElement.getBoundingClientRect().height;
			formBoxWrapper.nativeElement.style.height = `${formBoxHeight}px`;
		}
	}
}
