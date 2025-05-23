import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNoteComponent } from './question-note.component';

describe('QuestionNoteComponent', () => {
  let component: QuestionNoteComponent;
  let fixture: ComponentFixture<QuestionNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
