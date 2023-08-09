import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefletContactsComponent } from './reflet-contacts.component';

describe('RefletContactsComponent', () => {
  let component: RefletContactsComponent;
  let fixture: ComponentFixture<RefletContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefletContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefletContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
