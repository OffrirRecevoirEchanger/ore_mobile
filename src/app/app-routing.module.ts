import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { RefletComponent } from './reflet/reflet.component';
import { RefletContactsComponent } from './reflet/reflet-contacts/reflet-contacts.component';
import { RefletObservationComponent } from './reflet/reflet-observation/reflet-observation.component';
import { RefletSentimentsComponent } from './reflet/reflet-sentiments/reflet-sentiments.component';
import { RefletBesoinComponent } from './reflet/reflet-besoin/reflet-besoin.component';
import { RefletDemandeActionComponent } from './reflet/reflet-demande-action/reflet-demande-action.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'web/login', component: LoginComponent },
	{ path: 'messages', component: MessagesComponent },
	{
		path: 'reflet',
		component: RefletComponent,
		children: [
			{
				path: '',
				component: RefletContactsComponent,
			},
			{
				path: 'observation',
				component: RefletObservationComponent,
			},
			{
				path: 'sentiments',
				component: RefletSentimentsComponent,
			},
			{
				path: 'besoin',
				component: RefletBesoinComponent,
			},
			{
				path: 'demande_action',
				component: RefletDemandeActionComponent,
			},
		],
	},
	{ path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
