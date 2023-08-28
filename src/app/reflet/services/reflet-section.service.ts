import { ElementRef, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RefletSectionService {
	private _refletContentHeight!: number;
	private _refletContentHeightSubject = new ReplaySubject<number>();

	private _mainMaxHeight!: number;
	private _mainMaxHeightSubject = new ReplaySubject<number>();

	get refletContentHeight$(): Observable<number> {
		return this._refletContentHeightSubject.asObservable();
	}

	get mainMaxHeight$(): Observable<number> {
		return this._mainMaxHeightSubject.asObservable();
	}

	set refletContentHeight(newHeight: number) {
		if (newHeight !== this._refletContentHeight) {
			this._refletContentHeight = newHeight;
			this._refletContentHeightSubject.next(newHeight);
		}
	}

	set mainMaxHeight(newHeight: number) {
		if (newHeight !== this._mainMaxHeight) {
			this._mainMaxHeight = newHeight;
			this._mainMaxHeightSubject.next(newHeight);
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
