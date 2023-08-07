import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefletComponent } from './reflet.component';

describe('RefletComponent', () => {
  let component: RefletComponent;
  let fixture: ComponentFixture<RefletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
