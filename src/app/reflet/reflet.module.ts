import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefletSectionService } from './services/reflet-section.service';
import { RefletComponent } from '../reflet/reflet.component';
import { RefletContactsComponent } from '../reflet/reflet-contacts/reflet-contacts.component';
import {
	LucideAngularModule,
	Users,
	MessagesSquare,
	Eye,
	Smile,
	ListTodo,
	Split,
	MoreHorizontal,
} from 'lucide-angular';
import { RefletObservationComponent } from '../reflet/reflet-observation/reflet-observation.component';
import { RefletSentimentsComponent } from '../reflet/reflet-sentiments/reflet-sentiments.component';
import { RefletBesoinComponent } from '../reflet/reflet-besoin/reflet-besoin.component';
import { RefletDemandeActionComponent } from '../reflet/reflet-demande-action/reflet-demande-action.component';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '../navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandlerService } from '../services/error-handler.service';
import { RefletChatComponent } from './reflet-chat/reflet-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { AccountService } from '../services/account.service';

@NgModule({
	declarations: [
		RefletComponent,
		RefletContactsComponent,
		RefletObservationComponent,
		RefletSentimentsComponent,
		RefletBesoinComponent,
		RefletDemandeActionComponent,
		RefletChatComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		NavigationModule,
		NgbModule,
		ReactiveFormsModule,
		LucideAngularModule.pick({
			Users,
			MessagesSquare,
			Eye,
			Smile,
			ListTodo,
			Split,
			MoreHorizontal,
		}),
	],
	providers: [
		AccountService,
		ChatService,
		RefletSectionService,
		{
			provide: ErrorHandler,
			useExisting: ErrorHandlerService,
		},
	],
	exports: [RefletComponent],
})
export class RefletModule {}
