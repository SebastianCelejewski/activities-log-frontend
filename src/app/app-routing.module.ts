import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{ path: 'activities', component: MainPageComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/activities', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
    exports: [RouterModule]
})
export class AppRoutingModule { }