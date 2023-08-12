import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { NavigationModule } from '../navigation/navigation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
	declarations: [MessagesComponent],
	imports: [
		CommonModule,
		AppRoutingModule,
		ReactiveFormsModule,
		NavigationModule,
	],
	exports: [MessagesComponent],
})
export class MessagesModule {}
