import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppareilDashboard } from './appareil-dashboard';

describe('AppareilDashboard', () => {
  let component: AppareilDashboard;
  let fixture: ComponentFixture<AppareilDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppareilDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(AppareilDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
