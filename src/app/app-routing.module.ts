import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: 'activities', component: MainPageComponent },
	{ path: '', redirectTo: '/activities', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
    exports: [RouterModule]
})
export class AppRoutingModule { }