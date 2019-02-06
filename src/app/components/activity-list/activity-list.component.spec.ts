import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of, Observable } from 'rxjs';
import { Activity } from 'src/app/domain/activity';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivityListComponent } from './activity-list.component';


class ActivityServiceMock {
    activitiesAdded$ = new Subject<Activity>();

    getActivities(user: string): Observable<Activity[]> {
        return of([]);
    }
}

describe('ActivityListComponent', () => {
    let component: ActivityListComponent;
    let fixture: ComponentFixture<ActivityListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityListComponent],
            providers: [
                { provide: ActivityService, useClass: ActivityServiceMock },
                { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getUserName']) }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
