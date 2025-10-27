import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionPatternForm } from './create-question-pattern-form';

describe('CreateQuestionPatternForm', () => {
  let component: CreateQuestionPatternForm;
  let fixture: ComponentFixture<CreateQuestionPatternForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuestionPatternForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuestionPatternForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
