import { provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFeaturesComponent } from '../../../app/components/home/home-features';

describe('HomeFeaturesComponent', () => {
  let component: HomeFeaturesComponent;
  let fixture: ComponentFixture<HomeFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturesComponent],
      providers: [provideZoneChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all feature items', () => {
    const compiled = fixture.nativeElement;
    const features = compiled.querySelectorAll('.space-y-4 > div');
    expect(features.length).toBeGreaterThan(0);
  });

  it('should display feature emojis and text', () => {
    const compiled = fixture.nativeElement;
    const featureTexts = compiled.querySelectorAll('.space-y-4 span');
    expect(featureTexts.length).toBeGreaterThan(0);
  });
});