import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefletChatComponent } from './reflet-chat.component';

describe('RefletChatComponent', () => {
  let component: RefletChatComponent;
  let fixture: ComponentFixture<RefletChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefletChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefletChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
