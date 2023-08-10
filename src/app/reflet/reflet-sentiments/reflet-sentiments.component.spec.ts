import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefletSentimentsComponent } from './reflet-sentiments.component';

describe('RefletSentimentsComponent', () => {
  let component: RefletSentimentsComponent;
  let fixture: ComponentFixture<RefletSentimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefletSentimentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefletSentimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
