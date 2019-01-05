import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { DpDatePickerModule } from 'ng2-date-picker';
import { DatePipe } from '@angular/common';

import { ActivityListComponent } from './activity-list/activity-list.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';

@NgModule({
    declarations: [
        AppComponent,
        ActivityListComponent,
        CreateActivityComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        DpDatePickerModule
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
