import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'app-reflet',
	templateUrl: './reflet.component.html',
	styleUrls: ['./reflet.component.scss'],
})
export class RefletComponent implements AfterViewInit {
	@ViewChild('main') mainElement!: ElementRef<any>;
	@ViewChild('refletTop') refletTop!: ElementRef<any>;
	@ViewChild('refletOptions') refletOptions!: ElementRef<any>;
	@ViewChild('refletContent') refletContent!: ElementRef<any>;

	@HostListener('window:resize', ['$event'])
	onResize(_event: any) {
		this.refletContent.nativeElement.style.maxHeight = `${this.getRefletContentHeight()}px`;
	}

	getRefletContentHeight(): number {
		return (
			this.mainElement?.nativeElement.getBoundingClientRect().height -
			(this.refletTop?.nativeElement.getBoundingClientRect().height +
				this.refletOptions?.nativeElement.getBoundingClientRect()
					.height)
		);
	}

	ngAfterViewInit() {
		this.refletContent.nativeElement.style.maxHeight = `${this.getRefletContentHeight()}px`;
	}
}
