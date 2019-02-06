import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DutyService } from 'src/app/services/duty/duty.service';
import { DutiesComponent } from './duties.component';
import { Observable, of } from 'rxjs';

class DutyServiceMock {
  getDutyTypes(): Observable<string[]> {
    return of([]);
  }
}

describe('DutiesComponent', () => {
  let component: DutiesComponent;
  let fixture: ComponentFixture<DutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DutiesComponent],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getUserName']) },
        { provide: DutyService, useClass: DutyServiceMock }
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
