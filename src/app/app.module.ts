import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiAuthenticationService } from './services/api-authentication.service';
import { AccountService } from './services/account.service';
import { localStorageServiceFactory } from './factories/local-storage.service.factory';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { HttpRequestService } from './services/http-request/http-request.service';
import { httpRequestServiceFactory } from './factories/http-request.service.factory';
import { OreMembreService } from './services/model/ore-membre.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from './services/error-handler.service';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { AdminToolService } from './services/admin-tool.service';
import { ChatService } from './services/chat.service';
import { ConnectionIndicatorComponent } from './connection-indicator/connection-indicator.component';
import { MessagesComponent } from './messages/messages.component';
import { RefletComponent } from './reflet/reflet.component';
import { RefletContactsComponent } from './reflet/reflet-contacts/reflet-contacts.component';
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
import { RefletObservationComponent } from './reflet/reflet-observation/reflet-observation.component';
import { RefletSentimentsComponent } from './reflet/reflet-sentiments/reflet-sentiments.component';
import { RefletBesoinComponent } from './reflet/reflet-besoin/reflet-besoin.component';
import { RefletDemandeActionComponent } from './reflet/reflet-demande-action/reflet-demande-action.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		NavigationComponent,
		ErrorAlertComponent,
		ConnectionIndicatorComponent,
		MessagesComponent,
		RefletComponent,
		RefletContactsComponent,
		RefletObservationComponent,
		RefletSentimentsComponent,
		RefletBesoinComponent,
		RefletDemandeActionComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		HttpClientModule,
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
		ApiAuthenticationService,
		AccountService,
		OreMembreService,
		AdminToolService,
		ChatService,
		{
			provide: LocalStorageService,
			useFactory: localStorageServiceFactory,
		},
		{
			provide: HttpRequestService,
			useFactory: httpRequestServiceFactory,
			deps: [HttpClient],
		},
		{
			provide: ErrorHandler,
			useExisting: ErrorHandlerService,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
