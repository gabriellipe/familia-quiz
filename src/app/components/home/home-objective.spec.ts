import { provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeObjectiveComponent } from './home-objective';

describe('HomeObjectiveComponent', () => {
  let component: HomeObjectiveComponent;
  let fixture: ComponentFixture<HomeObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeObjectiveComponent],
      providers: [provideZoneChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the objective title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Objetivo');
  });

  it('should display the objective description', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Fortalecer a parceria entre família e escola');
  });
});