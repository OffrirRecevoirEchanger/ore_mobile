import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefletDemandeActionComponent } from './reflet-demande-action.component';

describe('RefletDemandeActionComponent', () => {
  let component: RefletDemandeActionComponent;
  let fixture: ComponentFixture<RefletDemandeActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefletDemandeActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefletDemandeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
