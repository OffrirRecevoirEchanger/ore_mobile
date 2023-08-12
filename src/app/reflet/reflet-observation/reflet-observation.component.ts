import { Component, ElementRef, ViewChild } from '@angular/core';
import { RefletSectionService } from '../services/reflet-section.service';

@Component({
	selector: 'app-reflet-observation',
	templateUrl: './reflet-observation.component.html',
	styleUrls: ['./reflet-observation.component.scss'],
})
export class RefletObservationComponent {
	@ViewChild('formBoxWrapper') formBoxWrapper!: ElementRef;
	@ViewChild('formBox') formBox!: ElementRef;

	constructor(private refletSectionService: RefletSectionService) {}

	toggleMenu(): void {
		this.refletSectionService.toggleMenu(this.formBoxWrapper, this.formBox);
	}
}
