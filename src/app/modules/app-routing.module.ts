import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from '../components/main-page/main-page.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { DutiesComponent } from '../components/duties/duties.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
	{ path: 'activities', component: MainPageComponent, canActivate: [AuthGuard] },
	{ path: 'duties', component: DutiesComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/activities', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
    exports: [RouterModule]
})
export class AppRoutingModule { }