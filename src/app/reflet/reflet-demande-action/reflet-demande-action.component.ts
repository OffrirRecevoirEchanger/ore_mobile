import { Component, ElementRef, ViewChild } from '@angular/core';
import { RefletSectionService } from '../services/reflet-section.service';

@Component({
	selector: 'app-reflet-demande-action',
	templateUrl: './reflet-demande-action.component.html',
	styleUrls: ['./reflet-demande-action.component.scss'],
})
export class RefletDemandeActionComponent {
	@ViewChild('formBoxWrapper') formBoxWrapper!: ElementRef;
	@ViewChild('formBox') formBox!: ElementRef;

	constructor(private refletSectionService: RefletSectionService) {}

	toggleMenu(): void {
		this.refletSectionService.toggleMenu(this.formBoxWrapper, this.formBox);
	}
}
