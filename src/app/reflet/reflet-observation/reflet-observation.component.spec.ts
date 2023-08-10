import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefletObservationComponent } from './reflet-observation.component';

describe('RefletObservationComponent', () => {
  let component: RefletObservationComponent;
  let fixture: ComponentFixture<RefletObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefletObservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefletObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
