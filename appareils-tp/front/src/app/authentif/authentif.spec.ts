import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Authentif } from './authentif';

describe('Authentif', () => {
  let component: Authentif;
  let fixture: ComponentFixture<Authentif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authentif],
    }).compileComponents();

    fixture = TestBed.createComponent(Authentif);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
