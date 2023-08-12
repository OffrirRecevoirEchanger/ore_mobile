import { Component, ElementRef, ViewChild } from '@angular/core';
import { RefletSectionService } from '../services/reflet-section.service';

@Component({
	selector: 'app-reflet-sentiments',
	templateUrl: './reflet-sentiments.component.html',
	styleUrls: ['./reflet-sentiments.component.scss'],
})
export class RefletSentimentsComponent {
	@ViewChild('formBoxWrapper') formBoxWrapper!: ElementRef;
	@ViewChild('formBox') formBox!: ElementRef;

	constructor(private refletSectionService: RefletSectionService) {}

	toggleMenu() {
		this.refletSectionService.toggleMenu(this.formBoxWrapper, this.formBox);
	}
}
