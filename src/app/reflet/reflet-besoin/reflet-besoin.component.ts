import { Component, ElementRef, ViewChild } from '@angular/core';
import { RefletSectionService } from '../services/reflet-section.service';

@Component({
	selector: 'app-reflet-besoin',
	templateUrl: './reflet-besoin.component.html',
	styleUrls: ['./reflet-besoin.component.scss'],
})
export class RefletBesoinComponent {
	@ViewChild('formBoxWrapper') formBoxWrapper!: ElementRef;
	@ViewChild('formBox') formBox!: ElementRef;

	constructor(private refletSectionService: RefletSectionService) {}

	toggleMenu(): void {
		this.refletSectionService.toggleMenu(this.formBoxWrapper, this.formBox);
	}
}
