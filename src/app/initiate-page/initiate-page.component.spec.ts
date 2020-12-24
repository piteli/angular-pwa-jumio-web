import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatePageComponent } from './initiate-page.component';

describe('InitiatePageComponent', () => {
  let component: InitiatePageComponent;
  let fixture: ComponentFixture<InitiatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
