import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Appareil } from './appareil';

describe('Appareil', () => {
  let component: Appareil;
  let fixture: ComponentFixture<Appareil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appareil],
    }).compileComponents();

    fixture = TestBed.createComponent(Appareil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
