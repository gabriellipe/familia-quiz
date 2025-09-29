import { provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeCtaComponent } from '../../../app/components/home/home-cta';

describe('HomeCtaComponent', () => {
  let component: HomeCtaComponent;
  let fixture: ComponentFixture<HomeCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCtaComponent],
      providers: [provideZoneChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit startQuiz event when onStartQuiz is called', () => {
    spyOn(component.startQuiz, 'emit');
    
    component['onStartQuiz']();
    
    expect(component.startQuiz.emit).toHaveBeenCalled();
  });

  it('should emit startQuiz event when button is clicked', () => {
    spyOn(component.startQuiz, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    
    button.click();
    
    expect(component.startQuiz.emit).toHaveBeenCalled();
  });
});