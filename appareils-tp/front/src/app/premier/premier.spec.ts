import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Premier } from './premier';

describe('Premier', () => {
  let component: Premier;
  let fixture: ComponentFixture<Premier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Premier],
    }).compileComponents();

    fixture = TestBed.createComponent(Premier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
