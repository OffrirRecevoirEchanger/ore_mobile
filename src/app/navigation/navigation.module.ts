import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { ConnectionIndicatorComponent } from '../connection-indicator/connection-indicator.component';

@NgModule({
	declarations: [NavigationComponent, ConnectionIndicatorComponent],
	imports: [CommonModule, RouterModule],
	exports: [NavigationComponent],
})
export class NavigationModule {}
