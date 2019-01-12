import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { DpDatePickerModule } from 'ng2-date-picker';
import { AppComponent } from '../components/app.component';

import { AppRoutingModule } from './app-routing.module';

import { ActivityListComponent } from '../components/activity-list/activity-list.component';
import { CreateActivityComponent } from '../components/create-activity/create-activity.component';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { DutiesComponent } from '../components/duties/duties.component';

@NgModule({
    declarations: [
        AppComponent,
        ActivityListComponent,
        CreateActivityComponent,
        MainPageComponent,
        PageNotFoundComponent,
        LoginComponent,
        DutiesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        DpDatePickerModule
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }