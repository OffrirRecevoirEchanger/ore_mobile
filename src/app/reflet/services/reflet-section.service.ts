import { ElementRef, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RefletSectionService {
	private _refletContentHeight!: number;
	private _refletContentHeightSubject = new ReplaySubject<number>();

	get refletContentHeight$(): Observable<number> {
		return this._refletContentHeightSubject.asObservable();
	}

	set refletContentHeight(newHeight: number) {
		if (newHeight !== this._refletContentHeight) {
			this._refletContentHeight = newHeight;
			this._refletContentHeightSubject.next(this._refletContentHeight);
		}
	}

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
