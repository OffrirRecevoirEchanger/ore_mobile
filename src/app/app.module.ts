import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { localStorageServiceFactory } from './factories/local-storage.service.factory';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { HttpRequestService } from './services/http-request/http-request.service';
import { httpRequestServiceFactory } from './factories/http-request.service.factory';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		NavigationComponent,
	],
	imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
	providers: [
		AuthenticationService,
		{
			provide: LocalStorageService,
			useFactory: localStorageServiceFactory,
		},
		{
			provide: HttpRequestService,
			useFactory: httpRequestServiceFactory,
			deps: [HttpClient],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
