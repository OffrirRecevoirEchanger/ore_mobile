import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefletBesoinComponent } from './reflet-besoin.component';

describe('RefletBesoinComponent', () => {
  let component: RefletBesoinComponent;
  let fixture: ComponentFixture<RefletBesoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefletBesoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefletBesoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
