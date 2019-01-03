import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';

@NgModule({
    declarations: [
        AppComponent,
        ActivitiesListComponent,
        CreateActivityComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
