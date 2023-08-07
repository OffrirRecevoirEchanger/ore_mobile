import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { RefletComponent } from './reflet/reflet.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'web/login', component: LoginComponent },
	{ path: 'messages', component: MessagesComponent },
	{ path: 'reflet', component: RefletComponent },
	{ path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
