import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreateActivityComponent } from './create-activity.component';


describe('CreateActivityComponent', () => {
  let component: CreateActivityComponent;
  let fixture: ComponentFixture<CreateActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateActivityComponent],
      providers: [
        { provide: ActivityService, useValue: jasmine.createSpy('ActivityService') },
        { provide: AuthService, useValue: jasmine.createSpy('AuthService') },
        { provide: DatePipe, useValue: jasmine.createSpyObj('DatePipe', ['transform']) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
