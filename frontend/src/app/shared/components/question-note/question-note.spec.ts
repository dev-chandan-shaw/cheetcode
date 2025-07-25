import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNote } from './question-note';

describe('QuestionNote', () => {
  let component: QuestionNote;
  let fixture: ComponentFixture<QuestionNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
