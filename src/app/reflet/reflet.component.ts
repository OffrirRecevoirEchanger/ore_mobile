import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	ViewChild,
} from '@angular/core';
import { RefletSectionService } from './services/reflet-section.service';

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

	private set refletContentHeight(newHeight: number) {
		this.refletSectionService.refletContentHeight = newHeight;
	}

	constructor(private refletSectionService: RefletSectionService) {}

	ngAfterViewInit() {
		this.refletSectionService.refletContentHeight$.subscribe(
			(newHeight) => {
				this.refletContent.nativeElement.style.maxHeight = `${newHeight}px`;
			}
		);
		this.calculateRefletContentHeight();
	}

	@HostListener('window:resize', ['$event'])
	onResize(_event: any) {
		this.calculateRefletContentHeight();
	}

	calculateRefletContentHeight(): void {
		this.refletContentHeight =
			this.mainElement?.nativeElement.getBoundingClientRect().height -
			(this.refletTop?.nativeElement.getBoundingClientRect().height +
				this.refletOptions?.nativeElement.getBoundingClientRect()
					.height);
	}
}
